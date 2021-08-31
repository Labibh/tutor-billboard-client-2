import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);

    document.body.style = "background: #ffffff";
  }

  render() {
    return (
      <div>
        <div className="background-image"></div>
        <Container fluid className="center-div">
          <Row className="pt-5">
            <Col md={6} xs={12}>
              <div className="landing-header">
                <h2>Find the Perfect Tutor Near You</h2>
              </div>
              <Form className="form-main">
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="form-label">Select Level</Form.Label>
                  <Form.Control className="form-input" as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="form-label">Select Subject</Form.Label>
                  <Form.Control className="form-input" as="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label className="form-label">
                    Postal/Zip Code
                  </Form.Label>
                  <Form.Control className="form-input" type="text" />
                </Form.Group>
                <Button className="search-button" type="submit">
                  Search
                </Button>
              </Form>
            </Col>
            <Col md={6} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
