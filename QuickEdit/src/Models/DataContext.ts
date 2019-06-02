import { FoodCollection } from "./FoodCollection";
import { CustomerCollection } from "./CustomerCollection";
import { TodoCollection } from "./TodoCollection";

export class DataContext {
    public Foods = new FoodCollection()
    public Customers = new CustomerCollection()
    public Todos =  new TodoCollection()

    public getCollections() {
        return [
            {title: "Food", path:'/food', collection: this.Foods },
            {title: "Customers", path:'/customers', collection: this.Customers },
            {title: "Todos", path:'/todos', collection: this.Todos }
        ]
    }
}

export const State = new DataContext()