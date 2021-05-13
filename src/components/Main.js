import React, { useState } from "react";
import Menu from './Menu';
import { DISHES } from '../shared/dishes'
import { COMMENTS } from '../shared/comments'
import { LEADERS } from '../shared/leaders'
import { PROMOTIONS } from '../shared/promotions'
import Dishdetail from './Dishdetail'; 
import Header from "./Header";
import Footer from "./Footer";
import { Redirect, Route, Switch } from "react-router";
import Home from "./Home";
import Contact from "./Contact";

function Main() {

    const[dishes, setDishes] = useState(DISHES);
    const[comments] = useState(COMMENTS);
    const[leaders] = useState(LEADERS);
    const[promotions] = useState(PROMOTIONS);

    const[selectedDish, setselectedDish] = useState(null);

    function handleClick(dishId){   
        setselectedDish(dishId)
    }

    const HomePage = () => {
        return (
            <Home 
                dish={dishes.filter(dish => dish.featured)[0]}
                promotion ={promotions.filter(promo => promo.featured)[0]}
                leader ={leaders.filter(leader => leader.featured)[0]}
            />        
        )
    }

    const DishWithId = ({match}) =>{
        return(
            <Dishdetail 
                dish={dishes.filter(dish => dish.id === parseInt(match.params.dishId,10))[0]}
                comment={comments.filter(comm => comm.dishId === parseInt(match.params.dishId,10))[0]}
            />
        )
    } 

    return (
        <div>
            <Header />
            <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path="/menu" component={() => <Menu dishes={dishes} />} />
                <Route path="/menu/:dishId" component={DishWithId} />
                <Route exact path="/contactus" component={Contact} />
                <Redirect to="/home" />
            </Switch>          
            <Footer />
        </div>
    );
  
}

export default Main;
