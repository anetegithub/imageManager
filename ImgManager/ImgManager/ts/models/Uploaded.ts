class Uploaded extends ViewModel {

    constructor(view: JQuery) {
        super(view);
        GlobalBindings.bind(new UploadedImagesBinding());
        GlobalBindings.execute(UploadedImagesBinding);
    }

    modelValidation(): Validator {
        return new Validator('Uploaded', x => { return true; }, 'All fields required!');
    }

    beforeSubmit() {
        GlobalBindings.unbind(UploadedImagesBinding);
    }

    submit() {
        this.goToUploading(this);
    }

    goToUploading($this) {
        $this.fromTemplate('uploading').then(x => {
            var $template = $(x);
            new Uploading($template);
        });
    }
}