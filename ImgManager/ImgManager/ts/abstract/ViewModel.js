var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class ViewModel extends TemplateLoader {
    constructor(view) {
        super();
        view.filter('input')
            .add(view.find('input'))
            .each((i, e) => {
            var jE = $(e);
            jE.change(x => {
                var val = jE.val();
                var label = jE.next('label');
                var validator = this[jE.attr('name') + "__validator"];
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
                    }
                    else {
                        jE.removeClass('invalid');
                        label.attr('data-success', validator.success_msg || '');
                    }
                }
                this[jE.attr('name')] = val;
                jE.addClass('valid');
            });
        });
        view.filter('button:not([type="submit"])')
            .add(view.find('button:not([type="submit"])'))
            .each((i, e) => {
            var jB = $(e);
            var attr = jB.attr('data-model-action');
            if (attr != null) {
                var action = this[jB.attr('data-model-action')];
                if (action != null)
                    jB.click(x => {
                        action(this);
                    });
            }
        });
        var sBtn = view.find('[type="submit"]');
        this.submitUrl = sBtn.attr('data-controller-action');
        sBtn.click(x => this.submitting());
        this.pushOnScreen(view, AttachType.Inside);
        screenViewModel = this;
    }
    set_validation(validator) {
        this[validator.field + "__validator"] = validator;
    }
    submitting() {
        return __awaiter(this, void 0, void 0, function* () {
            var validator = this.modelValidation();
            debugger;
            if (validator.validating_function(this)) {
                var response = yield this.request(this.submitUrl, this);
                debugger;
                this.submit(response);
            }
            else
                Materialize.toast(validator.error_msg, 3000, 'red');
        });
    }
}
//# sourceMappingURL=ViewModel.js.map