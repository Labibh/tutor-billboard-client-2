import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";

import { clearMessage } from "../../actions/message";

const NavbarComp = (props) => {
  const [expanded, setExpanded] = useState(false);
  const activeStyle = { color: "black" };
  const { user } = props;

  return (
    <Navbar expanded={expanded} bg="light" expand="lg" fixed="top">
      <Navbar.Brand as={NavLink} to="/">
        TutorBillBoard
      </Navbar.Brand>
      <Navbar.Toggle
        onClick={() => setExpanded(expanded ? false : "expanded")}
        aria-controls="basic-navbar-nav"
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link
            as={NavLink}
            onClick={() => setExpanded(false)}
            exact
            activeStyle={activeStyle}
            to="/"
          >
            Search
          </Nav.Link>
          {props.user ? (
            <>
              <Nav.Link
                as={NavLink}
                onClick={() => setExpanded(false)}
                activeStyle={activeStyle}
                to="/postad"
              >
                Post Ad
              </Nav.Link>
              <Nav.Link eventKey="disabled" disabled style={{ color: "black" }}>
                Signed in: {user.firstName}
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                activeStyle={activeStyle}
                onClick={() => {
                  props.logOut();
                  setExpanded(false);
                }}
                to="/login"
              >
                LogOut
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link
                as={NavLink}
                onClick={() => {
                  props.dispatch(clearMessage());
                  setExpanded(false);
                }}
                activeStyle={activeStyle}
                to="/register"
              >
                Register
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                onClick={() => {
                  props.dispatch(clearMessage());
                  setExpanded(false);
                }}
                activeStyle={activeStyle}
                to="/login"
              >
                Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(NavbarComp);
