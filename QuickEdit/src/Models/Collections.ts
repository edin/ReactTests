import {Collection} from './Models'

export class Food {
    public id: number = 0;
    public name: string = "";
    public calories: number = 0;
    public fat: number = 0;
    public carbs: number = 0;
    public protein: number = 0;

    static create(data: any): Food {
        const food = new Food();
        food.id = data.id || 0;
        food.name = data.name;
        food.calories = data.calories;
        food.fat = data.fat;
        food.carbs = data.carbs;
        food.protein = data.protein;
        return food;
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
