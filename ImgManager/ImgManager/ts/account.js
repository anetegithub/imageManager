var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class AccountManager extends TemplateLoader {
    isLogged() {
        return __awaiter(this, void 0, void 0, function* () {
            var serverDecision = yield this.request('/api/identity/check/');
            return serverDecision;
        });
    }
    logInForm() {
        return __awaiter(this, void 0, void 0, function* () {
            var $template = $(yield this.fromTemplate('LogIn'));
            new Identity($template);
        });
    }
    registerForm() {
        return __awaiter(this, void 0, void 0, function* () {
            var $template = $(yield this.fromTemplate('Registration'));
            new RegisterIdentity($template);
        });
    }
}
//# sourceMappingURL=account.js.map