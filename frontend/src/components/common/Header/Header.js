import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate(); // Ensure you are using parentheses to invoke the hook

  const handleCart = () => {
    console.log("Navigating to /cart"); // Debugging log
    navigate("/cart"); // Navigate to /cart
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm p-3">
      <Navbar.Brand className="font-weight-bold" onClick={() => navigate("/")}>
        S-Mart
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => navigate("/category/men")}>
              Snacks
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/category/women")}>
              Dairy
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigate("/category/kids")}>
              Vegetables
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>

        <Nav className="ml-auto">
          <Nav.Link
            as="a"
            className="d-flex align-items-center"
            onClick={(e) => {
              e.preventDefault(); // Prevent default behavior of href=""
              handleCart(); // Call navigation handler
            }}
          >
            <FaShoppingCart /> <span className="ml-2">Cart</span>
          </Nav.Link>
          <Nav.Link
            as="a"
            className="d-flex align-items-center"
            onClick={() => navigate("/account")}
          >
            <FaUser /> <span className="ml-2">Account</span>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
