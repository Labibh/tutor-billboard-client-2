import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "./Auth.css";

import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { clearMessage } from "../../actions/message";

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      validated: false,
    };

    document.body.style = "background: #353535";
  }

  onChangeUserEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleLogin(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ loading: true });
    const { dispatch, history } = this.props;

    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(login(this.state.email, this.state.password))
        .then(() => {
          dispatch(clearMessage());
          history.push("/");
        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
    }
    this.setState({ validated: true });
  }

  render() {
    const { isLoggedIn, message } = this.props;

    return (
      <div>
        <Container fluid className="container-reg">
          <Row>
            <Col style={{ paddingLeft: 0 }} md={5}>
              <div className="background-image-login"></div>
            </Col>
            <Col md={7}>
              <Form
                noValidate
                validated={this.state.validated}
                className="auth-form auth-form-login"
                onSubmit={this.handleLogin}
              >
                <div className="auth-header">
                  <h1>Tutor Login</h1>
                </div>
                <Form.Group controlId="formGridEmail">
                  <Form.Label className="form-label-reg">
                    Email Address
                  </Form.Label>
                  <Form.Control
                    required
                    type="email"
                    value={this.state.email}
                    onChange={this.onChangeUserEmail}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid E-mail address
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formGridPassword">
                  <Form.Label className="form-label-reg">Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter password
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="submit-button">
                  Login
                </Button>
                {message && (
                  <Alert variant="danger">
                    <p>{message}</p>
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
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message,
  };
}

export default connect(mapStateToProps)(Login);
