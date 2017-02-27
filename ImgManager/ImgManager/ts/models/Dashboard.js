var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class Dashboard extends ViewModel {
    modelValidation() {
        return new Validator('Dashboard', x => {
            return false;
        }, 'Dashboard not exists!');
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    transactions($this) {
        return __awaiter(this, void 0, void 0, function* () {
            var model = $this;
            var $template = $(yield model.fromTemplate('Transactions'));
            new Transactions($template);
        });
    }
    logout($this) {
        return __awaiter(this, void 0, void 0, function* () {
            var model = $this;
            var loggedoff = yield model.request('/api/account/logout');
            globalAuthToken = '';
            var $template = $(yield model.fromTemplate('LogIn'));
            new Identity($template);
        });
    }
}
//# sourceMappingURL=Dashboard.js.map