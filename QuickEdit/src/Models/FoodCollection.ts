import { Collection } from "../Foundation/Models";

export class Food {
    public id: number = 0;
    public name: string = "";
    public calories: number = 0;
    public fat: number = 0;
    public carbs: number = 0;
    public protein: number = 2;

    static create(data: any): Food {
        const model = new Food();
        model.id = data.id || 0;
        model.name = data.name;
        model.calories = data.calories;
        model.fat = data.fat;
        model.carbs = data.carbs;
        model.protein = data.protein;
        return model;
    }

    getToolbarTitle() {
        return "Food";
    }

    getMetaData() {
        return [
            {name: "name"},
            {name: "calories"},
            {name: "fat"},
            {name: "carbs"},
            {name: "protein"},
        ]
    }
}

export class FoodCollection extends Collection<Food>
{
    constructor() {
        super();
        this.items = [
            Food.create({id: 0, name:'Frozen yoghurt', calories: 159, fat:6.0, carbs:24, protein:4.0}),
            Food.create({id: 1, name:'Ice cream sandwich', calories:237, fat:9.0, carbs:37, protein:4.3}),
            Food.create({id: 2, name:'Eclair', calories:262, fat:16.0, carbs:24, protein:6.0}),
            Food.create({id: 3, name:'Cupcake', calories:305, fat:3.7, carbs:67, protein:4.3}),
            Food.create({id: 4, name:'Gingerbread', calories:356, fat:16.0, carbs:49, protein:3.9}),
        ]
    }

    createNewItem(): Food {
        return new Food();
    }
}