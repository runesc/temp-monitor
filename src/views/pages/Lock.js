/*!

=========================================================
* Black Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from 'react';
import classnames from "classnames";
import { auth } from "../../config/firebase"
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Alert,
  Col,
} from "reactstrap";


class Lock extends Component {

  state = {
    passFocus: false,
    email: "invitado@invitado.com",
    password: '',
    message: null
  }

  componentDidMount(){
    this.toggleClass()
  }

  toggleClass(){
    document.body.classList.toggle("lock-page");
    return () => {
      document.body.classList.toggle("lock-page");
    };
  }

  signIn = async e =>{
    e.preventDefault();

    const { email, password } = this.state

    if(!password.trim()){
      this.setState({message: "Contraseña incorrecta"})
      return
    }

    await auth.signInWithEmailAndPassword(email, password).then( user => {
      this.props.history.push('/admin/dashboard')
    }).catch( err => {
      this.setState({message: "Error intentalo de nuevo."})
    })

  }

  render() {
    const { passFocus, password, message } = this.state
    return (
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            {
              message ? <Alert color="danger">{ message }</Alert> : null
            }
            <Card className="card-lock card-white text-center">
              <CardHeader>
                <img alt="..." src={require("assets/img/emilyz.jpg").default} />
              </CardHeader>
              <CardBody>
                <CardTitle tag="h4">Nombre persona</CardTitle>
                <InputGroup
                  className={classnames({
                    "input-group-focus": passFocus,
                  })}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="tim-icons icon-key-25" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    value={ password }
                    onChange={ e => this.setState({password: e.target.value}) }
                  />
                </InputGroup>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-round"
                  color="primary"
                  href="#pablo"
                  size="lg"
                  onClick={(e) => this.signIn(e)}
                >
                  Unlock
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Container>
      </div>
    );
  }
}

export default Lock;