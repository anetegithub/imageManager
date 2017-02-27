var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class Transactions extends ViewModel {
    constructor(view) {
        super(view);
        globalBindings.push(new TransactionsBinding());
        this.set_validation(this.pwValidator);
        this.loadUserList(view);
    }
    loadUserList(view) {
        return __awaiter(this, void 0, void 0, function* () {
            var data = yield this.request('/api/users/availablecustomers');
            var processedData = {};
            $.each(data, (i, v) => {
                processedData[v] = null;
            });
            view.find('input.autocomplete').autocomplete({
                data: processedData,
                limit: 5
            });
        });
    }
    get pwValidator() {
        return new Validator('PW', x => x > 0, 'Amount should be a positive number!');
    }
    modelValidation() {
        return new Validator('Transaction', x => {
            var model = x;
            return !(model.Username || '').isNullOrWhitespace()
                && model.PW > 0;
        }, 'All fields required!');
    }
    backtodashboard($this) {
        return __awaiter(this, void 0, void 0, function* () {
            debugger;
            var model = $this;
            var $template = $(yield model.fromTemplate('Dashboard'));
            new Dashboard($template);
        });
    }
    submit() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
//# sourceMappingURL=Transactions.js.map