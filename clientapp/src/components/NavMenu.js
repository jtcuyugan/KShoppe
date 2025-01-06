import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/NavMenu.css';
import logo from '../assets/logo.png'; // Import the logo image
import cart from '../assets/cart.png'; // Import the cart image

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white box-shadow mb-3" container light>
        <NavbarBrand tag={Link} to="/">
        <img src={logo} alt="KShoppe Logo" className="logo" /> {/* Use the logo image */}
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
        <ul className="navbar-nav flex-grow">
          <NavItem>
          <NavLink tag={Link} className="text-white" to="/">Home</NavLink> {/* Set text color to white */}
          </NavItem>
          <NavItem>
          <NavLink tag={Link} className="text-white" to="/shop-items">Shop Items</NavLink> {/* Set text color to white */}
          </NavItem>
          <NavItem>
          <NavLink tag={Link} className="text-white" to="/product-table">Product List</NavLink> {/* Set text color to white */}
          </NavItem>
          {/* <NavItem>
          <NavLink tag={Link} className="text-white" to="/stock">Stock Items</NavLink> {/* Set text color to white */}
          {/* </NavItem> */}
          <NavItem>
          <NavLink tag={Link} className="text-white" to="/cart">
            <img src={cart} alt="Cart" className="cart" /> {/* Use the cart image */}
          </NavLink>
          </NavItem>
        </ul>
        </Collapse>
      </Navbar>
      </header>
    );
  }
}
