import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { isEmail, isAlpha, isByteLength } from "validator";
import "./Auth.css";

import { register } from "../../actions/auth";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confPassword: "",
      firstNameErr: "",
      lastNameErr: "",
      emailErr: "",
      passwordErr: "",
      confPasswordErr: "",
      message: "",
      validated: false,
      successful: false,
    };
    document.body.style = "background: #353535";

    this.handleRegister = this.handleRegister.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.passwordCheck = this.passwordCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidationOnBlur = this.handleValidationOnBlur.bind(this);
  }

  handleValidation(e, bool) {
    if (e.target.name === "firstName") {
      if (isAlpha(e.target.value) === !bool && e.target.value.length > 0) {
        this.setState({ firstNameErr: bool });
      }
    }
    if (e.target.name === "lastName") {
      if (isAlpha(e.target.value) === !bool && e.target.value.length > 0) {
        this.setState({ lastNameErr: bool });
      }
    }
    if (e.target.name === "email") {
      if (isEmail(e.target.value) === !bool && e.target.value.length > 0) {
        this.setState({ emailErr: bool });
      }
    }
  }

  passwordCheck(e) {
    if (e.target.name === "password") {
      if (
        isByteLength(e.target.value, { min: 6, max: 30 }) &&
        e.target.value.length > 0
      ) {
        this.setState({ passwordErr: false });
      } else {
        this.setState({ passwordErr: true });
      }
      if (e.target.value === this.state.confPassword) {
        this.setState({ confPasswordErr: false });
      } else if (
        e.target.value !== this.state.confPassword &&
        this.state.confPassword.length > 0
      ) {
        this.setState({ confPasswordErr: true });
      }
    }
    if (e.target.name === "confPassword") {
      if (e.target.value === this.state.password) {
        this.setState({ confPasswordErr: false });
      } else {
        this.setState({ confPasswordErr: true });
      }
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    //if onChange form becomes valid, set inValid prop to false
    this.handleValidation(e, false);
    this.passwordCheck(e);
  }

  handleValidationOnBlur(e) {
    this.handleValidation(e, true);
  }

  handleRegister(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      this.setState({ message: "Please fill in all fields before submission" });
    } else if (
      this.state.firstNameErr ||
      this.state.lastNameErr ||
      this.state.emailErr ||
      this.state.passwordErr ||
      this.state.confPasswordErr
    ) {
      this.setState({ message: "There is an error in your form" });
    } else {
      this.props
        .dispatch(
          register(
            this.state.firstName,
            this.state.lastName,
            this.state.email,
            this.state.password
          )
        )
        .then(() => {
          this.setState({
            successful: true,
            message: this.props.message,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
            message: this.props.message,
          });
        });
    }
    this.setState({ validated: true });
  }

  render() {
    return (
      <div>
        <Container fluid className="container-reg">
          <Row>
            <Col style={{ paddingLeft: 0 }} md={5}>
              <div className="background-image-reg" />
            </Col>
            <Col md={7}>
              <Form
                noValidate
                validated={this.state.validated}
                className="auth-form auth-form-register"
                onSubmit={this.handleRegister}
              >
                <div className="auth-header">
                  <h1>Tutor Registration</h1>
                </div>
                <Form.Row>
                  <Form.Group
                    as={Col}
                    controlId="formGridFirstName"
                    onBlur={this.handleValidationOnBlur}
                  >
                    <Form.Label className="form-label-reg">
                      First Name
                    </Form.Label>
                    <Form.Control
                      name="firstName"
                      required
                      type="text"
                      onChange={this.handleChange}
                      isInvalid={this.state.firstNameErr}
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    controlId="formGridLastName"
                    onBlur={this.handleValidationOnBlur}
                  >
                    <Form.Label className="form-label-reg">
                      Last Name
                    </Form.Label>
                    <Form.Control
                      name="lastName"
                      required
                      type="text"
                      onChange={this.handleChange}
                      isInvalid={this.state.lastNameErr}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group
                  controlId="formGridEmail"
                  onBlur={this.handleValidationOnBlur}
                >
                  <Form.Label className="form-label-reg">
                    Email Address
                  </Form.Label>
                  <Form.Control
                    required
                    name="email"
                    type="email"
                    onChange={this.handleChange}
                    isInvalid={this.state.emailErr}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid E-mail address
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group
                  controlId="formGridPassword"
                  onBlur={this.handleValidationOnBlur}
                >
                  <Form.Label className="form-label-reg">Password</Form.Label>
                  <Form.Control
                    required
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                    isInvalid={this.state.passwordErr}
                  />
                  <Form.Control.Feedback type="invalid">
                    The password must be between 6 and 30 characters.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formGridConfirmPassword">
                  <Form.Label className="form-label-reg">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    required
                    name="confPassword"
                    type="password"
                    onChange={this.handleChange}
                    isInvalid={this.state.confPasswordErr}
                  />
                  <Form.Control.Feedback type="invalid">
                    {" "}
                    Confirmed password must match
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="submit-button">
                  Register
                </Button>
                {this.state.message && (
                  <Alert variant={this.state.successful ? "success" : "danger"}>
                    <p>{this.state.message}</p>
                  </Alert>
                )}
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
