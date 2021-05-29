import React, { useEffect } from "react";
import Menu from './Menu';
import Dishdetail from './Dishdetail'; 
import Header from "./Header";
import Footer from "./Footer";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import Home from "./Home";
import Contact from "./Contact";
import About from "./About";
import {addComment ,fetchComments,fetchDishes, fetchPromos} from "../redux/ActionCreators"
import { actions } from "react-redux-form";

const mapStatetoProps = (state) => {
    return{
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions
    }
}

const mapDispatchtoProps = (dispatch) =>({
    addComment: (dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
})

function Main(props) {
    
    useEffect(() => {
        props.fetchDishes();
        props.fetchComments();
        props.fetchPromos();
    },[])



    const HomePage = () => {
        return (
            <Home 
                dish={props.dishes.dishes.filter(dish => dish.featured)[0]}
                dishesLoading={props.dishes.isLoading}
                dishesErrMess={props.dishes.errMess}
                promotion ={props.promotions.promotions.filter(promo => promo.featured)[0]}
                promoLoading={props.promotions.isLoading}
                promoErrMess={props.promotions.errMess}
                leader ={props.leaders.filter(leader => leader.featured)[0]}
                
            />        
        )
    }

    const DishWithId = ({match}) =>{
        return(
            <Dishdetail 
                dish={props.dishes.dishes.filter(dish => dish.id === parseInt(match.params.dishId,10))[0]}
                isLoading={props.dishes.isLoading}
                errMess={props.dishes.errMess}
                comment={props.comments.comments.filter(comm => comm.dishId ===parseInt(match.params.dishId,10))}
                commentsErrMess={props.comments.errMess}
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
                <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={props.resetFeedbackForm} />} />
                <Redirect to="/home" />
            </Switch>          
            <Footer />
        </div>
    );
  
}

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(Main));
