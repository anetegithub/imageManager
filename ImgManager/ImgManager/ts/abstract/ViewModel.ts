abstract class ViewModel extends TemplateLoader {

    set_validation(validator: Validator) {
        this[validator.field + "__validator"] = validator;
    }

    constructor(view: JQuery,target?:JQuery) {
        super();
        view.filter('input')
            .add(view.find('input'))
            .each((i, e) => {
            var jE = $(e);
            jE.change(x => {
                var val = jE.val();
                var label = jE.next('label');
                var validator = this[jE.attr('name') + "__validator"] as Validator;
                if (validator != null) {
                    if (!jE.hasClass('validate'))
                        jE.addClass('validate');
                    if (!validator.validating_function(val)) {
                        jE.removeClass('valid');
                        if (!jE.hasClass('invalid'))
                            jE.addClass('invalid');
                        label.attr('data-error', validator.error_msg);
                        this[jE.attr('name')] = ValidationState.Invalid;
                        return;
                    } else {
                        jE.removeClass('invalid');
                        label.attr('data-success', validator.success_msg || '');
                    }
                }
                this[jE.attr('name')] = val;
                jE.addClass('valid');
            });
        });
        view.filter('[data-model-action]')
            .add(view.find('[data-model-action]'))
            .each((i, e) => {
            var jB = $(e);
            var attr = jB.attr('data-model-action');
            if (attr != null) {
                var action = this[jB.attr('data-model-action')];
                debugger;
                var params = jB.attr('data-model-param-' + jB.attr('data-model-action'));
                if (action != null)
                    jB.click(x => {
                        action(this, params);
                    });
                jB.removeAttr('data-model-action');
                jB.removeAttr('data-model-param-' + jB.attr('data-model-action'));
            }
        });

        var sBtn = view.find('[type="submit"]')
        this.submitUrl = sBtn.attr('data-controller-action');
        sBtn.removeAttr('data-controller-action');
        sBtn.add(view.find('[data-model-submit]'))
            .removeAttr('data-model-submit')
            .click(x => this.submitting());

        this.pushOnScreen(view,
            AttachType.Inside,
            target);

        //screenViewModel = this;
    }

    private submitUrl: string;
    private async submitting() {
        var validator = this.modelValidation();      
        if (validator.validating_function(this)) {
            this.beforeSubmit();
            debugger;
            var response = await this.request<any>(this.submitUrl, this, this.httpMethod());
            this.submit(response);
            this.afterSubmit();
        }
        else
            Materialize.toast(validator.error_msg, 3000, 'red');
    }
    
    beforeSubmit() { }
    afterSubmit() { }
    httpMethod(): string { return 'POST'; }

    abstract modelValidation(): Validator;
    abstract async submit(response: any);

}