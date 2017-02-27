class SortingContract {
    page: number;
    pageSize: number;
    property: string;
    order: Order;

    public constructor(
        fields?: {
            page?: number,
            pageSize?: number,
            property?: string,
            order?: Order
        }) {
        if (fields) Object.assign(this, fields);
    }
}

enum Order {
    None = 0,
    Ascending,
    Descending
}