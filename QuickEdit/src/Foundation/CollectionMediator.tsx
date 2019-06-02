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
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function AlertDialog({control}) {
  return (
    <div>
      <Dialog
        open={control.state.showDeleteConfirm}
        onClose={e => control.onDialogClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {control.getDeleteMessage()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={e => control.onDialogClose(false)} color="primary">
            No
          </Button>
          <Button onClick={e => control.onDialogClose(true)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

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
      marginRight:10,
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

export function SearchAppBar({control}) {
  const classes = useStyles();
  const mode = control.state.mode;

  let fragment: any = null;

  if (mode === "add" || mode == "edit") {
    fragment = (<>
      <Button color="inherit" onClick={e => control.setMode("list")}>Back</Button>
    </>);
  } else {
    fragment = (<>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
            label="Search" {...control.bindToSearch()}
            placeholder="Search…"
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
        />
      </div>
      <Button color="inherit" onClick={e => control.setMode("add")}>Add</Button>
    </>);
  }


  return (
    <div className={classes.root}>

      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {control.getTitle()}
          </Typography>
          {fragment}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export abstract class CollectionMediator extends React.Component<any, any> {
    protected collection: any = null;

    private changeHandler: any;

    constructor(props: any) {
        super(props);

        this.collection = this.getCollection();
        const model = this.collection.createNewItem();

        this.state = {
            model: model,
            itemToDelete: null,
            showDeleteConfirm: false,
            search: "",
            items: this.collection.getItems()
        }

        this.changeHandler = (event) => {
            this.setState({
                items : this.collection.findBySearchText(this.state.search)
            })
        }

        this.collection.subscribe(this.changeHandler);
    }

    getTitle() {
        return "List";
    }

    render() {
        const mode = this.state.mode || "list";

        if (mode == "add") {
            return this.getEditView()
        } else if (mode == "edit") {
            return this.getEditView()
        }

        return (
            <>
                <SearchAppBar control={this} />
                <AlertDialog control={this} />
                {this.getListView()}
            </>
        );
    }

    getEditView() {
        return (
            <div>
                <SearchAppBar control={this} />
                {this.getEditForm()}
                <div>
                    <Grid container>
                        <Grid container xs={12} style={{paddingTop:10}} direction="row-reverse">
                            <Button style={{marginRight:10}} variant="contained" color="primary" onClick={e => this.saveItem()}>Save</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }

    getEditForm() { return (<></>); }
    getListView() { return (<></>); }
    getDeleteMessage() { return (<>Are you sure you want to delte this item.</>); }

    componentWillUnmount() {
        this.collection.unsubscribe(this.changeHandler);
    }

    getCollection(): any {
        return this.props.collection || null;
    }

    getValueByPath(model: any, path: string): any {
        const parts = path.split(".")
        let value = model;

        for (const prop of parts) {
            value = value[prop];
        }
        return value;
    }

    setMode(name) {
        this.setState({mode: name})
    }

    bindToSearch() {
        return {
            value: this.state.search,
            onChange: (e: any) => {
                const searchText = e.target.value
                this.setState({
                    search: searchText,
                    items : this.collection.findBySearchText(searchText)
                })
            }
        }
    }

    bindTo(path: string) {

        const modelValue = this.getValueByPath(this.state, path);

        return {
            value: modelValue,
            onChange: (e: any) => {

                const parts = path.split(".")
                let model = this.state;
                let propertyName = parts[parts.length-1]

                for (let i = 0; i < parts.length-1; i++){
                    model = model[parts[i]];
                }

                (model as any)[propertyName as any] = e.target.value;
                this.forceUpdate();
            }
        }
    }

    clearSearch() {
        return () => { this.setState({search: ""}) };
    }

    saveItem() {
        this.collection.save(this.state.model);
        this.setState({model: this.collection.createNewItem(), mode: "list"});
    }

    editItem(item) {
        this.setState({model: item, mode: "edit"});
    }

    onDialogClose(result) {
        const item: any = this.state.itemToDelete;
        if (result) {
            this.removeItem(item);
        }
        this.setState({
            itemToDelete: null,
            showDeleteConfirm: false
        });
    }

    confirmDelete(item) {
        this.setState({
            itemToDelete:item,
            showDeleteConfirm: true
        });
    }

    removeItem(item: any) {
        this.collection.remove(item)
    }
}