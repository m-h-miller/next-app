import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/Navbar';
import NavLink from "./NavLink";
import { useRouter } from 'next/router'
import storage from "@/utils/storage";
import useSWR, { mutate } from "swr";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = !!currentUser;

  const logOut = () => {
    localStorage.removeItem('user');
    mutate('user', null);
    router.push('/');
  };

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
                  <Link
                    href="#"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    onClick={logOut}
                  >
                    Sign Out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li style={{ padding: '1rem' }}>
                  <NavLink href="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Sign In
                  </NavLink>
                </li>
                <li style={{ padding: '1rem' }}>
                  <NavLink href="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Register
                  </NavLink>
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