import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {CollectionMediator} from './CollectionMediator'
import {TodoCollection, TodoItem} from '../Models/Todos'


export class TodoView extends CollectionMediator
{
    getModel() {
        return new TodoItem();
    }

    getCollection() {
        return new TodoCollection();
    }

    render() {
        const items = this.state.items;
        const count = items.length;
        const model = this.state.model;

        return (
            <div>
                <div>
                    <TextField label="Title" value={model.description} onChange={this.onModelChange('description')} />
                    <Button variant="contained" color="primary" onClick={e => this.saveItem()}>Add</Button>
                </div>

                <h2>Todo List {count}</h2>
                <table className="table" >
                    <tbody>
                        {items.map(item => (
                        <tr>
                            <td>{item.description}</td>
                            <td style={{width: '100px'}}>
                                <Button size="small" color="secondary" onClick={e => this.removeItem(item)}>Remove</Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}