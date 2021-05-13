import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { Breadcrumb,BreadcrumbItem, Form, FormGroup, Label, Col, Input, Button} from 'reactstrap';


function Contact(props) {

    const[contact,setContact] = useState({
        firstname:'',
        lastname:'',
        telnum:'',
        email:'',
        agree:'false',
        message:'',
        contactType:'Tel'
    })

    // const[firstname,setfirstname] = useState('');
    // const[lastname,setlastname] = useState('')
    // const[telnum,settelnum] = useState('')
    // const[email,setemail] = useState('')
    // const[agree,setagree] = useState(false)
    // const[message,setmessage] = useState('')
    // const[contactType,setcontactType] = useState('Tel')
    

    function handleInputChange(event){
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        setContact(prevValue =>{
            return{
                ...prevValue,
                [name]:value,
            }
        })
    }

    function handleSubmitChange(event){
        console.log('Current State is ' + JSON.stringify(contact));
        alert('Current State is ' + JSON.stringify(contact))
        event.preventDefault();
    }

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Contact Us</h3>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info" href><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>

            <div className="row row-content">
                <div className="col-12">
                    <h3>Send us your feedback</h3>
                </div>
                <div className="col-12 col-md-9">
                    <Form onSubmit={handleSubmitChange}>
                        <FormGroup row>
                            <Label htmlFor='firstname' md={2}>First Name</Label>
                            <Col md={10}>
                                    <Input type="text" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        value={contact.firstname}
                                        onChange={handleInputChange}                                                                    
                                    />
                            </Col> 
                        </FormGroup>

                        <FormGroup row>
                            <Label htmlFor='lastname' md={2}>Last Name</Label>
                            <Col md={10}>
                                    <Input type="text" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        value={contact.lastname} 
                                        onChange={handleInputChange}                                                                   
                                    />
                            </Col> 
                        </FormGroup>

                        <FormGroup row>
                            <Label htmlFor='telnum' md={2}>Contact</Label>
                            <Col md={10}>
                                    <Input type="tel" id="telnum" name="telnum"
                                        placeholder="Telephone number"
                                        value={contact.telnum}
                                        onChange={handleInputChange}
                                    />
                            </Col> 
                        </FormGroup>

                        <FormGroup row>
                            <Label htmlFor='email' md={2}>Email</Label>
                            <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={contact.email}
                                        onChange={handleInputChange}                                                                    
                                    />
                            </Col> 
                        </FormGroup>
                        <FormGroup row>
                                <Col md={{size: 6, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                name="agree"
                                                checked={contact.agree}
                                                onChange={handleInputChange}
                                            /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Input type="select" name="contactType"
                                            value={contact.contactType}
                                            onChange={handleInputChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                        </FormGroup>
                        <FormGroup row>
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message"
                                        rows="12"
                                        value={contact.message}
                                        onChange={handleInputChange}
                                    >
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Contact;