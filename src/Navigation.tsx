import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navigation() {
    const { pathname } = useLocation();
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                setCurrentUser(JSON.parse(user));
            } catch {
                localStorage.removeItem('user');
            }
        }
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('user');
        setCurrentUser(null);
    };

    return (
    <Navbar expand="lg" className="jaw-navbar bg-neavy-blue" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home" className="text-cream">Movie Review System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="/home">
            <Nav.Item> <Nav.Link className="navlink" as={Link} to="/" active={pathname.includes('home')}>Home</Nav.Link> </Nav.Item>
            <Nav.Item> <Nav.Link className="navlink" as={Link} to="/search" active={pathname.includes('search')} >Search</Nav.Link> </Nav.Item>
            {currentUser && (
              <Nav.Item> <Nav.Link className="navlink" as={Link} to="/profile" active={pathname.includes('profile')} >Profile</Nav.Link> </Nav.Item>
            )}
            
            {!currentUser && (
              <Nav.Item> <Nav.Link className="navlink" as={Link} to="/login" active={pathname.includes('login')} >Login</Nav.Link> </Nav.Item>
            )}
            
            {currentUser && (
              <>
                <Nav.Item> 
                  <Nav.Link className="navlink" style={{ color: '#fff', fontWeight: 'bold' }}>
                    Welcome, {currentUser.username || currentUser}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item> 
                  <Nav.Link className="navlink" onClick={handleSignOut} style={{ cursor: 'pointer' }}>
                    Sign Out
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}