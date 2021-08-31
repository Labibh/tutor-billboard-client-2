import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { postAdAction } from "../../actions/postAd";

import "./PostAd.css";
import Schedule from "./PostAdSchedule";
import profilePic from "../../images/profile_pic.png";

const defAvailability = [
  { day: "Mon", M: false, A: false, E: false, id: 5 },
  { day: "Tue", M: false, A: false, E: false, id: 6 },
  { day: "Wed", M: false, A: false, E: false, id: 7 },
  { day: "Thu", M: false, A: false, E: false, id: 8 },
  { day: "Fri", M: false, A: false, E: false, id: 9 },
  { day: "Sat", M: false, A: false, E: false, id: 10 },
  { day: "Sun", M: false, A: false, E: false, id: 11 },
];

class PostAd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adInfo: {
        imageUrl: "",
        education: "",
        location: "",
        rate: undefined,
        availability: defAvailability,
        subjects: [],
        aboutPerson: "",
      },
      validated: false,
      successful: false,
    };

    document.body.style = "background: #353535";

    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      adInfo: { ...this.state.adInfo, [e.target.name]: e.target.value },
    });
  }

  handleRegister(e) {
    e.preventDefault();
    let adInfo = this.state.adInfo;
    this.props.dispatch(
      postAdAction(
        adInfo.imageUrl,
        adInfo.education,
        adInfo.location,
        adInfo.rate,
        adInfo.availability,
        adInfo.subjects,
        adInfo.aboutPerson
      )
    );
    this.setState({ validated: true });
  }

  handleAvailabilityChange(time, index) {
    var availabilityArr = this.state.adInfo.availability.slice();
    var day = availabilityArr[index];
    availabilityArr[index][time] = !day[time];
    this.setState({
      adInfo: { ...this.state.adInfo, availability: availabilityArr },
    });
  }

  render() {
    return (
      <div>
        <Container fluid className="container-postAd">
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              <div className="form-box-postad">
                <h1>Enter Your Tutoring Ad Information</h1>
                <Form
                  noValidate
                  validated={this.state.validated}
                  className="form-main-postad"
                  onSubmit={this.handleRegister}
                >
                  <Row>
                    <Col md={4}>
                      <Card className="card-main-postad">
                        <Card.Img
                          variant="top"
                          src={profilePic}
                          className="profile-pic-postad"
                        />
                        <Card.Body style={{ padding: "10px" }}>
                          <Card.Title>Choose Profile Image</Card.Title>
                          <Card.Text>
                            Enter Image URL or keep default image
                          </Card.Text>
                          <Form.Group controlId="formAdUrl">
                            <Form.Control
                              type="text"
                              placeholder="URL"
                              value={this.state.adInfo.imageUrl}
                              name="imageUrl"
                              required
                              onChange={this.handleChange}
                            />
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={8} className="form-input-text-postad">
                      <Form.Group controlId="formAdEducation">
                        <Form.Control
                          type="text"
                          placeholder="Enter your education"
                          name="education"
                          required
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formAdLocation">
                        <Form.Control
                          type="text"
                          placeholder="Your Zip or Postal Code"
                          name="location"
                          required
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formAdRate">
                        <Form.Control
                          type="text"
                          placeholder="Rate $/Hour"
                          name="rate"
                          required
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formAdSubjects">
                        <Form.Control
                          type="text"
                          placeholder="Enter subjects you can tutor in"
                          name="subjects"
                          required
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                      <Form.Group controlId="formAdAboutPerson">
                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Write a little about yourself for the ad"
                          name="aboutPerson"
                          required
                          onChange={this.handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Schedule
                    availability={this.state.adInfo.availability}
                    handleAvailabilityChange={this.handleAvailabilityChange}
                  />
                  <Button type="submit">Post Ad</Button>
                </Form>
              </div>
            </Col>
            <Col md={2}></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect()(PostAd);
