class Validator {
    constructor(field, validation_function, error, success) {
        this.field = field;
        this.validating_function = validation_function;
        this.error_msg = error;
        this.success_msg = success == null ? 'success' : success;
    }
    validating_function(value) { return false; }
}
//# sourceMappingURL=Validator.js.map