class Paging extends ViewModel {
    totalPages:number;
    constructor(view: JQuery,total:number) {
        super(view, $('.paging'));
        this.totalPages = total;
    }

    get contract(): SortingContract {
        return GlobalBindings.getBinding(UploadedImagesBinding).Contract;
    }

    modelValidation(): Validator {
        return new Validator('Paging', x => { return this.validatePaging(x); }, 'Not enough pages!');
    }
    submit() { }
    validatePaging(x: Paging): boolean {
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

    turn($this: Paging, page: number) {
        $this.contract.page = page;
        $this.submit();
    }

    increment($this: Paging) {
        $this.contract.page++;
        $this.submit();
    }
    decrement($this: Paging) {
        $this.contract.page--;
        $this.submit();
    }
}