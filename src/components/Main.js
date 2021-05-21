import React, { useState } from "react";
import Menu from './Menu';
import Dishdetail from './Dishdetail'; 
import Header from "./Header";
import Footer from "./Footer";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import {addComment} from "../redux/ActionCreators"

const mapStatetoProps = (state) => {
    return{
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    }
}

const mapDispatchtoProps = (dispatch) =>({
    addComment: (dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment))
})

function Main(props) {

    const[selectedDish, setselectedDish] = useState(null);

    function handleClick(dishId){   
        setselectedDish(dishId)
    }

    const HomePage = () => {
        return (
            <Home 
                dish={props.dishes.filter(dish => dish.featured)[0]}
                promotion ={props.promotions.filter(promo => promo.featured)[0]}
                leader ={props.leaders.filter(leader => leader.featured)[0]}
            />        
        )
    }

    const DishWithId = ({match}) =>{
        return(
            <Dishdetail 
                dish={props.dishes.filter(dish => dish.id === parseInt(match.params.dishId,10))[0]}
                comment={props.comments.filter(comm => comm.dishId ===parseInt(match.params.dishId,10))}
                addComment={props.addComment}
            />
        )

    }

    return (
        <div>
            <Header />
            <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path="/menu" component={() => <Menu dishes={props.dishes} />} />
                <Route path="/menu/:dishId" component={DishWithId} />
                <Route path="/aboutus" component={() => <About leaders={props.leaders} />} />
                <Route exact path="/contactus" component={Contact} />
                <Redirect to="/home" />
            </Switch>          
            <Footer />
        </div>
    );
  
}

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(Main));
