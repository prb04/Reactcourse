/* eslint-disable react/jsx-pascal-case */
import React,{useState} from 'react'
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardText, CardBody, CardTitle, Button, Label, Row, Col, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom'
import {Control, LocalForm, Errors} from 'react-redux-form';

function RenderDish({dish}) {
    return(
            <Card>
                <CardImg width="100" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
    );
}

function RenderComments({comments,dishId,addComment}){
    if (comments != null){
        let comms = comments.map((comm, i) => {            
            return(
                <ul key={comm.id} className="list-unstyled">
                <li key={comm.id} >
                    {comm.comment}
                    <br /><br />
                    -- {comm.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comm.date)))}
                    <br /><br />
                </li>
                </ul>
                
            )
        })        
        
        return (
            <div>
                <h4>Comments</h4>
                <div>
                    {comms}
                    <CommentForm dishId={dishId} addComment={addComment}  />
                </div>
                
            </div>
            
        );
    }
    else {
        return(
            <div></div>
        )
    }
}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function CommentForm(props){

    const[isModalOpen,setisModalOpen] = useState(false);

    const toggleModal = () => {
        setisModalOpen(!isModalOpen);
    }

    const handleSubmit = (values) =>{
        props.addComment(props.dishId,values.rating,values.author,values.comment)
        toggleModal();
    }

    return(
    <div>
        <Button outline onClick={toggleModal}>
            <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>

        <div className="row row-content">
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}> 
                    Submit comment
                </ModalHeader>
                <ModalBody>
                    <div className="col-12 col-md-9">
                        <LocalForm onSubmit={(values) => handleSubmit(values)} >
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control" >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your name</Label>
                                <Col md={12}>
                                    <Control.text 
                                        model=".author" 
                                        id="author" 
                                        name="author" 
                                        placeholder="Author" 
                                        className="form-control" 
                                        validators={{ 
                                            required, 
                                            minLength: minLength(3), 
                                            maxLength: maxLength(15) 
                                            }}
                                        />

                                    <Errors 
                                        className="text-danger" 
                                        model=".author" 
                                        show="touched" 
                                        messages={{ 
                                            required: 'Required ', 
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 15 charaters or less' 
                                            }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="feedback" md={12}>Your feedback</Label>
                                <Col md={12}>
                                    <Control.textarea 
                                        model=".comment" 
                                        id="comment" 
                                        name="comment" 
                                        rows="6     " 
                                        className="form-control" 
                                        validators={{ required }} 
                                    />
                                    <Errors 
                                        className="text-danger" 
                                        model=".comment" 
                                        show="touched" 
                                        messages={{ required: 'Required' }}
                                    />
                                </Col>
                            </Row>

                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    </div>
    )
}

const Dishdetail = (props) => {
    if (props.dish != null) {   
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments 
                            comments={props.comment} 
                            addComment = {props.addComment} 
                            dishId = {props.dish.id}
                        />
                    </div>
                </div>
            </div>   
        );
    } else {
        return (
            <div></div>
        );
    }
}

export default Dishdetail;


