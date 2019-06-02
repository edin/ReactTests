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

export class CollectionEditor extends CollectionMediator
{
    private metaModel: any = null;

    getMetaModel() {
      if (this.metaModel == null) {
        this.metaModel = this.collection.createNewItem();
      }
      return this.metaModel;
    }

    getTitle() {
      const model = this.getMetaModel()
      if ("getToolbarTitle" in model) {
        return model.getToolbarTitle();
      }
      return model.constructor.name;
    }

    getEditForm() {
        const controlStyle = {margin:10}
        const metaData = this.collection.createNewItem().getMetaData();
        return (<>
          <form noValidate autoComplete="off" style={{marginTop:20}}>
            <Grid container>
              {metaData.map(field => {
                return (<Grid xs={12}>
                  <TextField style={controlStyle} label={field.name} {...this.bindTo(`model.${field.name}`)}></TextField>
                </Grid>)
              })}
            </Grid>
          </form>
        </>)
    }

    getListView() {
        const metaData = this.collection.createNewItem().getMetaData();

        return (<>
            <Table>
            <TableHead>
                <TableRow>
                    {metaData.map(field => <TableCell>{field.name}</TableCell>)}
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.state.items.map(item => (
                <TableRow>
                    {metaData.map(field => <TableCell>{item[field.name]}</TableCell>)}
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