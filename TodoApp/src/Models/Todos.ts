import {Collection} from './Models'

export class TodoItem
{
    public id: number = 0;
    public description: string = "";
}

export class TodoCollection extends Collection<TodoItem>
{
}