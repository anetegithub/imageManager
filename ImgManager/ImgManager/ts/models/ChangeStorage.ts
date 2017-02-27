class ChangeStorage extends ViewModel {
    Path: string;
    
    modelValidation(): Validator {        
        return new Validator('Storage', x => { return true; }, 'Not enough pages!');
    }
    submit() { Application.MainScreen(); }
    back($this: ChangeStorage) {
        $this.submit();
    }
    httpMethod(): string {
        return 'GET';
    }
}