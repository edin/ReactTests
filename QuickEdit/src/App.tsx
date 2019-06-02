import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import './App.css';

import {FoodList} from './Views/FoodList'
import {CollectionEditor} from './Foundation/CollectionEditor'
import {State} from './Models/DataContext'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

function MenuList(props) {
  return (<List style={props.style} component="nav">{props.children}</List>)
}

function MenuItem(props) {
  return (
  <Link to={props.to}>
    <ListItem button>
      <ListItemText primary={props.children} />
    </ListItem>
  </Link>)
}

function AppRouter() {
  return (
    <Router>
      <Grid container>
        <Grid xs={2} className="menu">
          <h2 className="title">Menu</h2>
          <MenuList>
            {State.getCollections().map(e => {
              return <MenuItem to={e.path}>{e.title}</MenuItem>
            })}
          </MenuList>
        </Grid>
        <Grid xs={10} className="content">
          {State.getCollections().map(e => {
            return <Route path={e.path} component={() => (<CollectionEditor collection={e.collection} />)} />
          })}
        </Grid>
      </Grid>
    </Router>
  );
}

export default AppRouter;