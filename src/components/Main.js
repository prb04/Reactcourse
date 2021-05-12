import React, { useState } from "react";
import Menu from './Menu';
import { DISHES } from '../shared/dishes'
import Dishdetail from './Dishdetail'; 
import Header from "./Header";
import Footer from "./Footer";
import { Redirect, Route, Switch } from "react-router";
import Home from "./Home";

function Main() {

    const[dishes, setDishes] = useState(DISHES)
    const[selectedDish, setselectedDish] = useState(null);

    function handleClick(dishId){   
        setselectedDish(dishId)
    }

    const HomePage = () => {
        return (<Home />)
    }

    return (
        <div>
            <Header />
            <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path="/menu" component={() => <Menu dishes={dishes} />} />
                <Redirect to="/home" />
            </Switch>          
            <Footer />
        </div>
    );
  
}

export default Main;
