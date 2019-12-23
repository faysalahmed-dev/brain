export default function(str) {
    //console.log(str);
    if (!str.includes("/")) return str.trim();
    const toPath = str.match(/\/.*/);
    return [toPath[0], toPath.input.split("/")[0].trim()];
}
