import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


import {FoodList} from './Views/FoodList'
import {FoodCollection} from './Models/Collections'

const State = {
  Foods : new FoodCollection()
}

function App() {
  return (
    <div className="App">
      <h2>Quick Edit</h2>
      <Grid container spacing={3} className="root">
        <Grid xs={12}>
            <FoodList collection={State.Foods} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;