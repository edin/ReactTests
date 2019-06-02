import { Collection } from "../Foundation/Models";

export class Customer {
    public id: number = 0;
    public name: string = "";
    public firstName: string = "";
    public lastName: string = "";

    static create(data: any): Customer {
        const model = new Customer();
        model.id = data.id || 0;
        model.name = data.name;
        model.firstName = data.firstName;
        model.lastName = data.lastName;
        return model;
    }

    getMetaData() {
        return [
            {name: "name"},
            {name: "firstName"},
            {name: "lastName"}
        ]
    }
}

export class CustomerCollection extends Collection<Customer>
{
    createNewItem(): Customer {
        return new Customer();
    }
}