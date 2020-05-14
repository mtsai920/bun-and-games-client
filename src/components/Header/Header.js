import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link className="navbar-text" href="#create-recipe">Create Recipe</Nav.Link>
    <Nav.Link className="navbar-text" href="#recipes">View Recipes</Nav.Link>
    <Nav.Link className="navbar-text" href="#change-password">Change Password</Nav.Link>
    <Nav.Link className="navbar-text" href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link className="navbar-text" href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link className="navbar-text" href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar className="navbar" expand="md">
    <Navbar.Brand href="#/homepage"><span className="header-brand">
      ALL BUN & GAMES </span><span className="emoji" role="img" aria-label="donut-emoji"> 🍔</span>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
