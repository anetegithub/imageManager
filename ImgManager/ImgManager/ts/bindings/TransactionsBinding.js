var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class TransactionsBinding extends Binding {
    constructor() {
        super($('.transactions-ui'));
    }
    fieldUrlCollection() {
        var handler = this.transactionsHandler;
        return [
            new BindingField({
                field: 'usertransactions',
                url: '/api/balance/mytransactions/',
                datahandler: handler
            })
        ];
    }
    transactionsHandler($this, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var html = $();
            //var concat_data = data.credits.concat(data.debits) as any[];
            for (let i = 0; i < data.length; i++) {
                var transaction = data[i];
                var template = yield $this.request('/templates/get/', { name: 'TransactionHistory' });
                template = template.replace('{{Operation}}', transaction.operation == 0 ? "Debit" : "Credit");
                template = template.replace('{{From/To}}', transaction.operation == 0 ? "To" : "From");
                template = template.replace('{{Person}}', transaction.UserName);
                template = template.replace('{{OperationSign}}', transaction.operation == 0 ? "-" : "+");
                template = template.replace('{{PW}}', transaction.amount);
                template = template.replace('{{When}}', transaction.when);
                template = template.replace('{{Total}}', transaction.total);
                html = html.add($(template));
            }
            debugger;
            $this["usertransactions"] = html.wrapAll($("<div>")).parent().html();
        });
    }
    trasactions($this) {
    }
}
//# sourceMappingURL=TransactionsBinding.js.map