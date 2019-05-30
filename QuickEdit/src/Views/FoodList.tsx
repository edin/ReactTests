import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import {CollectionMediator} from './CollectionMediator'

export class FoodList extends CollectionMediator
{
    render() {
        return (
            <div>
                {this.getForm()}
                <div>
                    <Grid container>
                        <Grid xs={4}>
                            <TextField
                                label="Search" {...this.bindTo("search")}
                                InputProps={{
                                    endAdornment: <Button onClick={this.clearSearch()} >Clear</Button>,
                                }}
                            ></TextField>
                        </Grid>

                        <Grid container xs={8} style={{paddingTop:10}} direction="row-reverse">
                            <Button variant="contained" size="small" color="primary" onClick={e => this.saveItem()}>Add</Button>
                        </Grid>
                    </Grid>
                </div>
                {this.getListView()}
            </div>
        );
    }

    getForm() {
        return (<>
            <div>
                <div><TextField label="Name" {...this.bindTo("model.name")}></TextField></div>
                <div><TextField label="Calories" {...this.bindTo("model.calories")}></TextField></div>
                <div><TextField label="Fat" {...this.bindTo("model.fat")}></TextField></div>
                <div><TextField label="Carbs" {...this.bindTo("model.carbs")}></TextField></div>
                <div><TextField label="Protein" {...this.bindTo("model.protein")}></TextField></div>
            </div>
        </>)
    }

    getListView() {
        return (<>
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
                {this.state.items.map(item => (
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
        </>)
    }
}