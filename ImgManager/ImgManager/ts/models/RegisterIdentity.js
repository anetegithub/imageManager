class RegisterIdentity extends Identity {
    constructor(view) {
        super(view);
        this.set_validation(this.passwordConfirmValidator);
    }
    get passwordConfirmValidator() {
        return new Validator('PasswordConfirm', (confirmedPassword) => {
            return this.Password == confirmedPassword;
        }, 'Password must be the same!', 'Passwords match!');
    }
    modelValidation() {
        return new Validator('Identity', x => {
            var model = x;
            return !(model.Name || '').isNullOrWhitespace()
                && !(model.Email || '').isNullOrWhitespace()
                && !(model.Password || '').isNullOrWhitespace()
                && !(model.PasswordConfirm || '').isNullOrWhitespace();
        }, 'All fields required!');
    }
}
//# sourceMappingURL=RegisterIdentity.js.map