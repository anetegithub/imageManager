String.prototype.isNullOrWhitespace = (function () {
    return function () {
        return this === null || this.match(/^ *$/) !== null;
    };
})();
//# sourceMappingURL=string.js.map