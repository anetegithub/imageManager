var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class Identity extends ViewModel {
    constructor(view) {
        super(view);
        this.set_validation(this.emailValidator);
    }
    get emailValidator() {
        return new Validator('Email', (email) => {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }, 'Email must following standarts!', '');
    }
    modelValidation() {
        return new Validator('Identity', x => {
            var model = x;
            return !(model.Email || '').isNullOrWhitespace()
                && !(model.Password || '').isNullOrWhitespace();
        }, 'All fields required!');
    }
    submit() { this.login(this); }
    auth($this) {
        return __awaiter(this, void 0, void 0, function* () {
            var model = $this;
            var submitValidator = model.modelValidation();
            if (!submitValidator.validating_function(model)) {
                Materialize.toast(submitValidator.error_msg, 3000, 'red');
                return;
            }
            var token = yield model.request('/token', {
                "grant_type": "password",
                "username": model.Email,
                "password": model.Password
            });
            globalAuthToken = token.access_token;
            var am = new AccountManager();
            if (yield am.isLogged()) {
                var $template = $(yield model.fromTemplate('Dashboard'));
                new Dashboard($template);
            }
            else {
                Materialize.toast('Authorization not accepted!', 6000, 'red');
                model.login(model);
            }
        });
    }
    register($this) {
        $this.fromTemplate('Registration').then(x => {
            var $template = $(x);
            new RegisterIdentity($template);
        });
    }
    login($this) {
        debugger;
        $this.fromTemplate('LogIn').then(x => {
            var $template = $(x);
            new Identity($template);
        });
    }
}
//# sourceMappingURL=Identity.js.map