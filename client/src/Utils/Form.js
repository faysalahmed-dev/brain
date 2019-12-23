import patten from "./regPatten";
export const testInputValue = (name, value, password) => {
    if (name === "newPassword") name = "password";
    if (name === "confirmPassword") {
        if (!patten.password.test(value) || password !== value) {
            return [name, true];
        }
        return [name, false];
    } else if (!patten[name].test(value)) return [name, true];
    else return [name, false];
};

export const buttonDisabledOrNot = error =>
    Object.values(error).every(err => err === false);

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

export function runImage(url, callBack) {
    testImage(url).then(callBack.bind(null, url), callBack.bind(null, url));
}
