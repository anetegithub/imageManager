class Uploaded extends ViewModel {

    constructor(view: JQuery) {
        super(view);
        GlobalBindings.unbind(UploadedImagesBinding);
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

    get binding(): UploadedImagesBinding {
        return GlobalBindings.getBinding(UploadedImagesBinding);
    }
    get contract(): SortingContract {
        return this.binding.Contract;
    }

    sort($this: Uploaded, order: string) {
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