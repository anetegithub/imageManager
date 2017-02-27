class Binding extends Request {
    constructor(view) {
        super((xhr) => { });
        view.find('[data-binding-field]').each((i, v) => {
            var $jE = $(v);
            var field = $jE.attr('data-binding-field');
            var stageAttr = $jE.attr('data-binding-stage');
            Object.defineProperty(this, field, {
                set: (val) => {
                    if (stageAttr == null || stageAttr == 'text')
                        $jE.text(val);
                    else
                        $jE.html(val);
                }
            });
        });
        view.find('[data-binding-action]').each((i, e) => {
            var jB = $(e);
            var action = this[jB.attr('data-binding-action')];
            if (action != null)
                jB.click(x => {
                    action(this);
                });
        });
    }
    execute() {
        var fieldUrl = this.fieldUrlCollection();
        $.each(fieldUrl, (i, v) => {
            this.fieldBind(v);
        });
    }
    fieldBind(binding) {
        var promise = this.request(binding.url);
        promise.then((x) => {
            if (binding.datahandler != null)
                binding.datahandler(this, x);
            else
                this[binding.field] = x || '';
        }, (x) => {
            this[binding.field] = '';
        });
    }
}
class BindingField {
    constructor(fields) {
        if (fields)
            Object.assign(this, fields);
    }
}
//# sourceMappingURL=Binding.js.map