import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

import {TodoView} from './Views/TodoView'


function App() {
  return (
    <div className="App">
        <div className="split">
            <div> <TodoView /> </div>
            <div> <TodoView /> </div>
        </div>
    </div>
  );
}

export default App;