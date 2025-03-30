import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FaUser, FaSignOutAlt, FaNewspaper, FaSearch } from 'react-icons/fa';
import { logout } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { searchNews } from '../../redux/actions/newsActions';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchNews(searchTerm));
      navigate(`/news?search=${searchTerm}`);
    } else {
      navigate('/news');
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect className="py-2">
        <Container>
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <FaNewspaper className="me-2" />
            News Aggregator
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form className="d-flex mx-auto" onSubmit={submitHandler}>
              <FormControl
                type="search"
                placeholder="Search news..."
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-light" type="submit">
                <FaSearch />
              </Button>
            </Form>
            <Nav className="ms-auto">
              <Link to="/news" className="nav-link">News</Link>
              <Link to="/sources" className="nav-link">Sources</Link>
              {userInfo ? (
                <NavDropdown
                  title={<span><FaUser className="me-1" /> {userInfo.name}</span>}
                  id="username"
                >
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                  <NavDropdown.Divider />
                  <Link to="/" className="dropdown-item" onClick={logoutHandler}>
                    <FaSignOutAlt className="me-1" /> Logout
                  </Link>
                </NavDropdown>
              ) : (
                <Link to="/login" className="nav-link">
                  <FaUser className="me-1" /> Sign In
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
