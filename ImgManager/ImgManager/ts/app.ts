class App extends TemplateLoader {
    public async start() {
        await this.MainScreen();
        GlobalBindings.bind(new ServerTimeBinding());
    }

    public async MainScreen() {
        await this.setInterface(Uploaded, 'view');
    }
    public async UploadingScreen() {
        await this.setInterface(Uploading, 'uploading');
    }

    private async setInterface<T extends ViewModel>(ctor: { new (...args: any[]): T }, template: string) {
        var $template = $(await this.fromTemplate(template));
        new ctor($template);
    }
}

var Application = new App();
Application.start();