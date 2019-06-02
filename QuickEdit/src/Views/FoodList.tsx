import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import {CollectionMediator} from '../Foundation/CollectionMediator'

export class FoodList extends CollectionMediator
{
    getTitle() {
      return "Food List";
    }

    getEditForm() {
        const controlStyle = {margin:10}
        return (<>
          <form noValidate autoComplete="off" style={{marginTop:20}}>
            <Grid container>
              <Grid xs={12}>
                <TextField style={controlStyle} label="Name" {...this.bindTo("model.name")}></TextField>
              </Grid>
              <Grid xs={3}>
                <TextField style={controlStyle} label="Calories" {...this.bindTo("model.calories")}></TextField>
              </Grid>
              <Grid xs={3} >
                <TextField style={controlStyle} label="Fat" {...this.bindTo("model.fat")}></TextField>
              </Grid>
              <Grid xs={3}>
                <TextField style={controlStyle} label="Carbs" {...this.bindTo("model.carbs")}></TextField>
              </Grid>
              <Grid xs={3}>
                <TextField style={controlStyle} label="Protein" {...this.bindTo("model.protein")}></TextField>
              </Grid>
            </Grid>
          </form>
        </>)
    }

    getListView() {
        return (<>
            <Table>
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
                            <Button size="small" color="secondary" onClick={(e) => this.confirmDelete(item) } >Delete</Button>
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