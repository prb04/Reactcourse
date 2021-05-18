import React from "react";
import Main from './components/Main'
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "./redux/configureStore";
import {Provider} from 'react-redux';

const store = configureStore();

function App() { 

  return (
    <Provider store = {store}>
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
  
}

export default App;
