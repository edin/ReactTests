import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


import {TodoView} from './Views/TodoView'
import {TodoCollection} from './Models/Todos'

const State = {
  Todos : new TodoCollection()
}

function App() {
  return (
    <div className="App">
      <h2>Todo App</h2>
      <Grid container spacing={3} className="root">
        <Grid item xs={6}>
          <Paper className="paper">
            <TodoView collection={State.Todos} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className="paper">
            <TodoView collection={State.Todos} />
          </Paper>
        </Grid>
      </Grid>        
    </div>
  );
}

export default App;