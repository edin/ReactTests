import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';

import {CollectionMediator} from './CollectionMediator'

import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
  }),
);

function SearchAppBar({control}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <Typography className={classes.title} variant="h6" noWrap>
            List Edit
          </Typography>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
                label="Search" {...control.bindTo("search")}
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
            />
          </div>
          <Button variant="contained" size="small" color="primary" onClick={e => control.setMode("add")}>Add</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export class FoodList extends CollectionMediator
{
    render() {
        const mode = this.state.mode || "list";

        if (mode == "add") {
            return this.renderEdit()
        } else if (mode == "edit") {
            return this.renderEdit()
        }

        return (
            <>
                <SearchAppBar control={this} />
                {this.getListView()}
            </>
        );

    //     <AppBar position="relative">
    //     <Toolbar>
    //         <Typography variant="h6" color="inherit" noWrap>
    //             List Edit
    //         </Typography>
    //
    //         <Grid container>
    //             <Grid xs={4}>
    //                 <TextField
    //                     label="Search" {...this.bindTo("search")}
    //                     InputProps={{
    //                         endAdornment: <Button onClick={this.clearSearch()} >Clear</Button>,
    //                     }}
    //                 ></TextField>
    //             </Grid>
    //
    //             <Grid container xs={8} style={{paddingTop:10}} direction="row-reverse">
    //                 <Button variant="contained" size="small" color="primary" onClick={e => this.setMode("add")}>Add</Button>
    //             </Grid>
    //         </Grid>
    //     </Toolbar>
    //     </AppBar>
    }

    renderEdit() {
        return (
            <div>
                <AppBar position="relative">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            List Edit
                        </Typography>
                        <Grid container>
                            <Grid container style={{paddingTop:10}} direction="row-reverse">
                                <Button variant="contained" size="small" color="primary" onClick={e => this.setMode("list")}>Back</Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                {this.getForm()}
                <div>
                    <Grid container>
                        <Grid container xs={8} style={{paddingTop:10}}>
                            <Button variant="contained" size="small" color="primary" onClick={e => this.saveItem()}>Save</Button>
                        </Grid>
                    </Grid>
                </div>
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