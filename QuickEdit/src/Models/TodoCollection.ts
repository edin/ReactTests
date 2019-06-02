import { Collection } from "../Foundation/Models";

export class Todo {
    public id: number = 0;
    public title: string = "";
    public description: string = "";

    static create(data: any): Todo {
        const model = new Todo();
        model.id = data.id || 0;
        model.title = data.title;
        model.description = data.description;
        return model;
    }

    getMetaData() {
        return [
            {name: "title"},
            {name: "description"}
        ]
    }
}

export class TodoCollection extends Collection<Todo>
{
    createNewItem(): Todo {
        return new Todo();
    }
}
