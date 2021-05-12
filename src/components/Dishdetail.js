import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';

function Dishdetail(props) {
    let dish = props.dish
    if(dish!=null){
        
        const comment = dish.comments.map(comm => {
            console.log(comm);
            return(

                <blockquote className='blockquote col-12'>
                        <p> {comm.comment} </p>
                        <footer className='blockquote-footer'>{comm.author}, {comm.date}</footer>
                </blockquote>
                // <ul key={comm.id} className="list-unstyled">
                //     <li className="comment">{comm.comment}</li>
                //     <li className="author">-- {comm.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comm.date)))}</li>
                // </ul>
            )
            
        })

        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1 ">
                        <Card>
                            <CardImg top src={props.dish.image} alt={props.dish.name} />
                            <CardBody>
                                <CardTitle>{props.dish.name}</CardTitle>
                                <CardText>{props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>

                    <div className="col-12 col-md-5 m-1 ">
                        <Card>
                            <CardBody>
                                <CardTitle><h4>Comments</h4></CardTitle>
                                <CardText>{comment}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                </div>
               
            </div>        
        )
        
    }else{
        return(
            <div>

            </div>
        )
    }

    
}

export default Dishdetail;
