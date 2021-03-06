if (!Array.prototype.remove) {
    Array.prototype.remove = function (elem) {
        return this.filter(e => e !== elem);
    };
}
String.prototype.isNullOrWhitespace = (function () {
    return function () {
        return this === null || this.match(/^ *$/) !== null;
    };
})();
String.prototype.fileNameExtension = (function () {
    return function () {
        var str = this;
        return (/[.]/.exec(str)) ? /[^.]+$/.exec(str)[0] : undefined;
    };
})();
var AttachType;
(function (AttachType) {
    AttachType[AttachType["NoAttach"] = 0] = "NoAttach";
    AttachType[AttachType["Append"] = 1] = "Append";
    AttachType[AttachType["Prepend"] = 2] = "Prepend";
    AttachType[AttachType["After"] = 3] = "After";
    AttachType[AttachType["Before"] = 4] = "Before";
    AttachType[AttachType["Inside"] = 5] = "Inside";
    AttachType[AttachType["Replace"] = 6] = "Replace";
})(AttachType || (AttachType = {}));
class JQueryPromise {
    constructor(executor) {
        let dfd = $.Deferred();
        function fulfilled(value) {
            let promise = value;
            if (value && promise.then) {
                promise.then(fulfilled, rejected);
            }
            else {
                dfd.resolve(value);
            }
        }
        function rejected(reason) {
            let promise = reason;
            if (reason && promise.then) {
                promise.then(fulfilled, rejected);
            }
            else {
                dfd.reject(reason);
            }
        }
        executor(fulfilled, rejected);
        return dfd.promise();
    }
}
class HtmlPusher {
    pushOnScreen(html, attach, jqueryTarget) {
        var target = jqueryTarget || $('.screen');
        switch (attach) {
            case AttachType.After:
                target.after(html);
                break;
            case AttachType.Before:
                target.before(html);
                break;
            case AttachType.Append:
                target.append(html);
                break;
            case AttachType.Prepend:
                target.prepend(html);
                break;
            case AttachType.Inside:
                target.html('');
                target.append(html);
                break;
            case AttachType.Replace:
                target.replaceWith(html);
                break;
            default: break;
        }
    }
}
class Request extends HtmlPusher {
    constructor(error) {
        super();
        this.errorCatch = error;
    }
    requestXHR(xhr) {
        var response = xhr;
        return response;
    }
    request(url, data, httpMethod, contentType) {
        var response = $.ajax({
            url: url,
            type: httpMethod || 'post',
            data: data,
            beforeSend: function (xhr, settings) { console.warn("authorization doesn't exists!"); },
            error: (xhr, z, u) => { this.errorCatch(xhr); },
            contentType: contentType || "application/x-www-form-urlencoded"
        });
        return response;
    }
}
class Binding extends Request {
    constructor(view) {
        super(Binding.bindingXhrError);
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
            $jE.removeAttr('data-binding-field');
            $jE.removeAttr('data-binding-stage');
        });
        view.find('[data-binding-action]').each((i, e) => {
            var jB = $(e);
            var action = this[jB.attr('data-binding-action')];
            if (action != null)
                jB.click(x => {
                    action(this);
                });
            jB.removeAttr('data-binding-action');
        });
    }
    static bindingXhrError(xhr) {
        console.log(xhr.responseText);
    }
    execute() {
        var fieldUrl = this.fieldUrlCollection();
        $.each(fieldUrl, (i, v) => {
            this.fieldBind(v);
        });
    }
    fieldBind(binding) {
        var promise = this.request(binding.url, binding.requestParams, binding.httpMethod, binding.contentType);
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
class GlobalBindings {
    static get globalBindings() {
        if (window['globalBindings'] == null)
            window['globalBindings'] = new Array();
        return window['globalBindings'];
    }
    static set setGlobal(bindings) {
        window['globalBindings'] = bindings;
    }
    static bind(binding) {
        GlobalBindings.globalBindings.push(binding);
    }
    static unbind(ctor) {
        var binding = GlobalBindings.getBinding(ctor);
        if (binding != null)
            GlobalBindings.setGlobal = GlobalBindings.globalBindings.remove(binding);
    }
    static getBinding(ctor) {
        var enumerable = GlobalBindings.globalBindings
            .filter(x => x instanceof ctor);
        if (enumerable.length > 0)
            return enumerable[0];
        return null;
    }
    static execute(...args) {
        let executable = GlobalBindings.globalBindings;
        if (args.length > 0)
            executable = executable.filter(x => x instanceof args[0]);
        $.each(executable, (i, v) => {
            v.execute();
        });
    }
}
class ServerLinked extends Request {
    constructor() {
        super((xhr) => {
            if (xhr != null) {
                if (xhr.status == 400) {
                    var errObj = JSON.parse(xhr.responseText);
                    if (errObj.ModelState != null)
                        $.each(errObj.ModelState[""], (i, v) => Materialize.toast(v, 4000, 'red'));
                    else
                        Materialize.toast(errObj.error_description, 4000, 'red');
                }
                if (xhr.status == 401)
                    Materialize.toast('Wrong email or password!', 4000, 'red');
            }
        });
    }
    requestXHR(xhr) {
        var request = super.requestXHR(xhr);
        request.done(() => {
            GlobalBindings.execute();
        });
        return request;
    }
    request(url, data, httpMethod) {
        var request = super.request(url, data, httpMethod);
        request.done(() => {
            GlobalBindings.execute();
        });
        return request;
    }
}
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class TemplateLoader extends ServerLinked {
    fromTemplate(template) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request('interface/template/', { name: template });
        });
    }
}
var ValidationState;
(function (ValidationState) {
    ValidationState[ValidationState["Invalid"] = 0] = "Invalid";
    ValidationState[ValidationState["Valid"] = 1] = "Valid";
    ValidationState[ValidationState["NotValid"] = 2] = "NotValid";
})(ValidationState || (ValidationState = {}));
class UploadedImagesBinding extends Binding {
    constructor() {
        super($('.screen'));
        this.Contract = new SortingContract({
            page: 1,
            pageSize: 9,
            property: 'Id',
            order: Order.Descending
        });
    }
    fieldUrlCollection() {
        var handler = this.imageGridHandler;
        return [
            new BindingField({
                field: 'image-grid',
                url: '/api/images/read/',
                datahandler: handler,
                requestParams: JSON.stringify(this.Contract),
                contentType: 'application/json'
            })
        ];
    }
    imageGridHandler($this, uploaded) {
        return __awaiter(this, void 0, void 0, function* () {
            var template = yield $this.request('/interface/template/', { name: 'image-grid' });
            for (let i = 0; i < 9; i++) {
                var replacedBy;
                if (uploaded.data[i] != undefined) {
                    var imgInfo = uploaded.data[i];
                    replacedBy = '<div class="card ' + (imgInfo.itsNew ? 'glow' : '') + '">\
                    <div class="card-image">\
                        <img src="' + imgInfo.VirtualPath + '">\
                        <span class="card-title">' + imgInfo.Name + '</span>\
                    </div>\
                </div>';
                }
                else
                    replacedBy = '';
                template = template.replace('{{' + i + '}}', replacedBy);
            }
            yield $this.pagination($this, uploaded);
            $this["image-grid"] = $(template).wrapAll($("<div>")).parent().html();
        });
    }
    pagination($this, uploaded) {
        return __awaiter(this, void 0, void 0, function* () {
            var template = yield $this.request('/interface/template/', { name: 'paging' });
            let ul = '';
            var total = Math.fround(uploaded.total / $this.Contract.pageSize) + 1;
            for (let i = 1; i < total; i++) {
                ul += '<li data-model-submit="true" data-model-action="turn" data-model-param-turn="' + i + '" class="waves-effect ' + ($this.Contract.page == i ? 'active' : '') + '"><a href="#!">' + i + '</a></li>';
            }
            var $template = $(template.replace('{{pagination}}', ul));
            debugger;
            new Paging($template, total);
        });
    }
}
class ServerTimeBinding extends Binding {
    constructor() {
        super($('.nav-wrapper'));
        GlobalBindings.execute(ServerTimeBinding);
    }
    fieldUrlCollection() {
        return [
            new BindingField({
                field: 'updated',
                url: '/api/utils/servertime/'
            })
        ];
    }
}
class ViewModel extends TemplateLoader {
    constructor(view, target) {
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
        var sBtn = view.find('[type="submit"]');
        this.submitUrl = sBtn.attr('data-controller-action');
        sBtn.removeAttr('data-controller-action');
        sBtn.add(view.find('[data-model-submit]'))
            .removeAttr('data-model-submit')
            .click(x => this.submitting());
        this.pushOnScreen(view, AttachType.Inside, target);
        //screenViewModel = this;
    }
    set_validation(validator) {
        this[validator.field + "__validator"] = validator;
    }
    submitting() {
        return __awaiter(this, void 0, void 0, function* () {
            var validator = this.modelValidation();
            if (validator.validating_function(this)) {
                this.beforeSubmit();
                debugger;
                var response = yield this.request(this.submitUrl, this, this.httpMethod());
                this.submit(response);
                this.afterSubmit();
            }
            else
                Materialize.toast(validator.error_msg, 3000, 'red');
        });
    }
    beforeSubmit() { }
    afterSubmit() { }
    httpMethod() { return 'POST'; }
}
class Validator {
    constructor(field, validation_function, error, success) {
        this.field = field;
        this.validating_function = validation_function;
        this.error_msg = error;
        this.success_msg = success == null ? 'success' : success;
    }
    validating_function(value) { return false; }
}
class Uploaded extends ViewModel {
    constructor(view) {
        super(view);
        GlobalBindings.unbind(UploadedImagesBinding);
        GlobalBindings.bind(new UploadedImagesBinding());
        GlobalBindings.execute(UploadedImagesBinding);
    }
    modelValidation() {
        return new Validator('Uploaded', x => { return true; }, 'All fields required!');
    }
    beforeSubmit() {
        GlobalBindings.unbind(UploadedImagesBinding);
    }
    submit() {
        this.goToUploading(this);
    }
    get binding() {
        return GlobalBindings.getBinding(UploadedImagesBinding);
    }
    get contract() {
        return this.binding.Contract;
    }
    sort($this, order) {
        debugger;
        $this.contract.property = 'Created';
        $this.contract.order = order == "ascending" ? Order.Ascending : Order.Descending;
        $this.binding.execute();
    }
    changeStorage() {
        Application.StorageScreen();
    }
    goToUploading($this) {
        $this.fromTemplate('uploading').then(x => {
            var $template = $(x);
            new Uploading($template);
        });
    }
}
class Uploading extends ViewModel {
    modelValidation() {
        return new Validator('Uploading', x => { return this.validFiles(); }, 'Not suitable files! Not more then 9 picture files!');
    }
    submit() { this.upload(this); }
    back($this) {
        Application.MainScreen();
    }
    validFiles() {
        var valid = true;
        var validExtensions = [
            "jpg",
            "jpeg",
            "gif",
            "tiff",
            "png",
        ];
        var files = $('form')[0][0].files;
        for (let i = 0; i < files.length; i++) {
            if (validExtensions.indexOf(files[i].name.fileNameExtension().toLowerCase()) == -1)
                valid = false;
        }
        if (valid)
            valid = files.length > 0
                && files.length < 9;
        return valid;
    }
    upload($this) {
        return __awaiter(this, void 0, void 0, function* () {
            var uploaded = yield $this.requestXHR($.ajax({
                url: 'api/images/create',
                type: 'PUT',
                data: new FormData($('form')[0]),
                cache: false,
                contentType: false,
                processData: false,
                xhr: function () {
                    var myXhr = $.ajaxSettings.xhr();
                    if (myXhr.upload) {
                        myXhr.upload.addEventListener('progress', function (e) {
                            if (e.lengthComputable) {
                                $('.determinate').css('width', ((e.loaded / e.total) * 100).toString() + "%");
                            }
                        }, false);
                    }
                    return myXhr;
                },
            }));
            var template = yield $this.request('/interface/template/', { name: 'image-grid' });
            for (let i = 0; i < 9; i++) {
                var replacedBy;
                if (uploaded.data[i] != undefined) {
                    var imgInfo = uploaded.data[i];
                    replacedBy = '<div class="card">\
                    <div class="card-image">\
                        <img src="' + imgInfo.VirtualPath + '">\
                        <span class="card-title">' + imgInfo.Name + '</span>\
                    </div>\
                </div>';
                }
                else
                    replacedBy = '';
                template = template.replace('{{' + i + '}}', replacedBy);
            }
            $('.image-grid').html('');
            $('.image-grid').append($(template));
        });
    }
}
class SortingContract {
    constructor(fields) {
        if (fields)
            Object.assign(this, fields);
    }
}
var Order;
(function (Order) {
    Order[Order["None"] = 0] = "None";
    Order[Order["Ascending"] = 1] = "Ascending";
    Order[Order["Descending"] = 2] = "Descending";
})(Order || (Order = {}));
class ImageInfo {
}
class UploadedImages {
}
class ChangeStorage extends ViewModel {
    modelValidation() {
        return new Validator('Storage', x => { return true; }, 'Not enough pages!');
    }
    submit() { Application.MainScreen(); }
    back($this) {
        $this.submit();
    }
    httpMethod() {
        return 'GET';
    }
}
class Paging extends ViewModel {
    constructor(view, total) {
        super(view, $('.paging'));
        this.totalPages = total;
    }
    get contract() {
        return GlobalBindings.getBinding(UploadedImagesBinding).Contract;
    }
    modelValidation() {
        return new Validator('Paging', x => { return this.validatePaging(x); }, 'Not enough pages!');
    }
    submit() { }
    validatePaging(x) {
        if (x.contract.page <= 0) {
            x.contract.page = 1;
            return false;
        }
        if (x.contract.page > this.totalPages) {
            x.contract.page = this.totalPages;
            return false;
        }
        return true;
    }
    turn($this, page) {
        $this.contract.page = page;
        $this.submit();
    }
    increment($this) {
        $this.contract.page++;
        $this.submit();
    }
    decrement($this) {
        $this.contract.page--;
        $this.submit();
    }
}
class App extends TemplateLoader {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.MainScreen();
            GlobalBindings.bind(new ServerTimeBinding());
        });
    }
    MainScreen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setInterface(Uploaded, 'view');
        });
    }
    UploadingScreen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setInterface(Uploading, 'uploading');
        });
    }
    StorageScreen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setInterface(ChangeStorage, 'storage');
        });
    }
    setInterface(ctor, template) {
        return __awaiter(this, void 0, void 0, function* () {
            var $template = $(yield this.fromTemplate(template));
            new ctor($template);
        });
    }
}
var Application = new App();
Application.start();
/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="interfaces/array.ts" />
/// <reference path="interfaces/string.ts" />
/// <reference path="interfaces/materialize.ts" />
/// <reference path="utility/attachtype.ts" />
/// <reference path="interfaces/jquerypromise.ts" />
/// <reference path="abstract/htmlpusher.ts" />
/// <reference path="abstract/request.ts" />
/// <reference path="abstract/binding.ts" />
/// <reference path="bindings/globalbindings.ts" />
/// <reference path="abstract/serverlinked.ts" />
/// <reference path="abstract/templateloader.ts" />
/// <reference path="abstract/validationstate.ts" />
/// <reference path="bindings/uploadedimagesbinding.ts" />
/// <reference path="bindings/servertimebinding.ts" />
/// <reference path="abstract/viewmodel.ts" />
/// <reference path="utility/validator.ts" />
/// <reference path="models/uploaded.ts" />
/// <reference path="models/uploading.ts" />
/// <reference path="contracts/sortingcontract.ts" />
/// <reference path="contracts/imageinfo.ts" />
/// <reference path="contracts/uploadedimages.ts" />
/// <reference path="models/changestorage.ts" />
/// <reference path="models/paging.ts" />
/// <reference path="app.ts" />
//# sourceMappingURL=application.js.map