interface String {
    isNullOrWhitespace: () => boolean;
    fileNameExtension: () => string;
}
String.prototype.isNullOrWhitespace = (function () {
    return function () {
        return this === null || this.match(/^ *$/) !== null;
    };
})();
String.prototype.fileNameExtension = (function () {
    return function () {
        var str = this as string;
        return (/[.]/.exec(str)) ? /[^.]+$/.exec(str)[0] : undefined;
    }
})();