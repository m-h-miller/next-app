import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/Navbar';
import Link from "next/link";

const Navbar = () => {
  const isLoggedIn = false;


  return (
    <NavBar bg="light" expand="lg">
      <Container>
        <NavBar.Brand href="/">
          Logo
        </NavBar.Brand>
        <NavBar.Toggle aria-controls="basic-navbar-nav" />
        <NavBar.Collapse id="basic-navbar-nav" style={{ justifyContent: 'right' }}>
          <Nav style={{ float: 'right' }}>
            <ul style={{ listStyle: 'none', display: 'flex', margin: '0' }}>
            {isLoggedIn ? (
              <>
                <li style={{ padding: '1rem' }}>
                  <Link href="/out" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Sign Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li style={{ padding: '1rem' }}>
                  <Link href="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Sign In
                  </Link>
                </li>
                <li style={{ padding: '1rem' }}>
                  <Link href="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Register
                  </Link>

                </li>
              </>
            )}
            </ul>
          </Nav>
        </NavBar.Collapse>
      </Container>
    </NavBar>
  );
};

export default Navbar;