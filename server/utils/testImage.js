function testImage(url, timeoutT) {
  return new Promise((resolve, reject) => {
    const timeout = timeoutT || 5000;
    let timer;
    let img = new Image();
    img.onerror = img.onabort = function() {
      clearTimeout(timer);
      reject("error");
    };
    img.onload = function() {
      clearTimeout(timer);
      resolve("success");
    };
    timer = setTimeout(function() {
      // reset .src to invalid URL so it stops previous
      // loading, but doens't trigger new load
      img.src = "//!!!!/noexist.jpg";
      reject("timeout");
    }, timeout);
    img.src = url;
  });
}

exports.runImage = (url, callBack) => {
  testImage(url).then(callBack.bind(null), callBack.bind(null));
};
