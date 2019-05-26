import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';

import {CollectionMediator} from './CollectionMediator'
import {FoodCollection, Food} from '../Models/Collections'

export class FoodList extends CollectionMediator
{
    constructor(props) {
        super(props);
    }

    getForm() {
        return (<div> Form Here </div>)
    }

    getListView() {
        return (<>  </>)
    }

    clearSearch() {
        return () => {
            this.setState({
                ...this.state,
                search: ""
            })
        }
    }

    updateSearch() {
        return (e) => {
            this.setState({
                ...this.state,
                search: e.target.value
            })
        }
    }

    addNewItem() {
        this.collection.save(this.collection.createNewItem())
    }

    editItem(item) {
        alert("Feature not implemented!")
    }

    render() {
        const items = this.state.items;
        const model = this.state.model;
        const search = this.state.search || "";

        return (
            <div>
                <div>
                    <Grid container>
                        <Grid xs={4}>
                            <TextField
                                label="Search"
                                value={search}
                                onChange={this.updateSearch()}
                                InputProps={{
                                    endAdornment: <Button onClick={this.clearSearch()} >Clear</Button>,
                                }}
                            ></TextField>
                        </Grid>

                        <Grid container xs={8} style={{paddingTop:10}} direction="row-reverse">
                            <Button variant="contained" size="small" color="primary" onClick={e => this.addNewItem()}>Add</Button>
                        </Grid>
                    </Grid>
                </div>
                <Table className='foodTable'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(item => (
                        <TableRow>
                            <TableCell component="th" scope="row">{item.name}</TableCell>
                            <TableCell align="right">{item.calories}</TableCell>
                            <TableCell align="right">{item.fat}</TableCell>
                            <TableCell align="right">{item.carbs}</TableCell>
                            <TableCell align="right">{item.protein}</TableCell>
                            <TableCell>
                                <Grid container direction="row-reverse">
                                    <Button size="small" color="secondary" onClick={(e) => this.removeItem(item) } >Delete</Button>
                                    <Button size="small" color="primary" onClick={(e) => this.editItem(item) }>Edit</Button>
                                </Grid>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}