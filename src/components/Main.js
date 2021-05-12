import React, { useState } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from './Menu';
import { DISHES } from '../shared/dishes'
import Dishdetail from './Dishdetail'; 

function Main() {

    const[dishes, setDishes] = useState(DISHES)
    const[selectedDish, setselectedDish] = useState(null);

    function handleClick(dishId){   
        setselectedDish(dishId)
    }

    return (
        <div>
            <Navbar dark color ="primary">
                <div className="container">
                <NavbarBrand href='/'>
                    Ristorante Con Fusion
                </NavbarBrand>
                </div>
            </Navbar>
            <Menu 
                dishes = {dishes}
                onClick = {(dishId) => handleClick(dishId)}                 
            />
            <Dishdetail dish={dishes} />
        </div>
    );
  
}

export default Main;
