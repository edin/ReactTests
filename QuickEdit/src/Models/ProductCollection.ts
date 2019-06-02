import { Collection } from "../Foundation/Models";

export class Product {
    public id: number = 0;
    public title: string = "";
    public price: number = 0;

    static create(data: any): Product {
        const model = new Product();
        model.id = data.id || 0;
        model.title = data.title;
        model.price = Number(data.price);
        return model;
    }

    getMetaData() {
        return [
            {name: "title"},
            {name: "price"}
        ]
    }
}

export class ProductCollection extends Collection<Product>
{
    createNewItem(): Product {
        return new Product();
    }
}
