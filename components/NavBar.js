import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavBar from 'react-bootstrap/Navbar';
import NavLink from "./NavLink";
import { useRouter } from 'next/router'
import storage from "@/utils/storage";
import useSWR from "swr";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const { asPath } = router;
  const { data: currentUser, mutate } = useSWR("user", storage);
  const isLoggedIn = !!currentUser;

  const logOut = () => {
    localStorage.removeItem('user');
    mutate();
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
                    className={`${asPath === '/profile' && 'active'}`}
                    href="/profile"
                    style={{
                      textDecoration: 'none',
                      color: asPath === '/profile' ? 'inherit' : 'rgba(0, 0, 0, 0.7)'
                    }}
                  >
                    {currentUser?.email}
                  </Link>
                </li>
                <li style={{ padding: '1rem' }}>
                  <Link
                    className={`${asPath === '/new' && 'active'}`}
                    href="/new"
                    style={{
                      textDecoration: 'none',
                      color: asPath === '/new' ? 'inherit' : 'rgba(0, 0, 0, 0.7)'
                    }}
                  >
                    New Post
                  </Link>
                </li>
                <li style={{ padding: '1rem' }} onClick={logOut}>
                  <Link
                    href="#"
                    style={{
                      textDecoration: 'none',
                      color: 'rgba(0, 0, 0, 0.7)'
                    }}
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