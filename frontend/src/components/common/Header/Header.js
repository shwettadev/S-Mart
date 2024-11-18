import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm p-3">
      <Navbar.Brand href="" className="font-weight-bold">S-Mart</Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        
        <Nav className="me-auto">
          {/* <Nav.Link href="/">Home</Nav.Link> */}
          {/* <Nav.Link href="/shop">Shop</Nav.Link> */}
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            <NavDropdown.Item href="/category/men">Snacks</NavDropdown.Item>
            <NavDropdown.Item href="/category/women">Dairy</NavDropdown.Item>
            <NavDropdown.Item href="/category/kids">Vegetables</NavDropdown.Item>
            {/* <NavDropdown.Divider /> */}
            {/* <NavDropdown.Item href="/sale">Sale</NavDropdown.Item> */}
          </NavDropdown>
        </Nav>
        
        <Form className="d-flex">
          <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
          <Button variant="outline-success">Search</Button>
        </Form>

        <Nav className="ml-auto">
          <Nav.Link href="/cart" className="d-flex align-items-center">
            <FaShoppingCart /> <span className="ml-2">Cart</span>
          </Nav.Link>
          <Nav.Link href="/account" className="d-flex align-items-center">
            <FaUser /> <span className="ml-2">Account</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
