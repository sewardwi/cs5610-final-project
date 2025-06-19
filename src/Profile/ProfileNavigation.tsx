import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function ProfileNavigation() {
    const { pathname } = useLocation();
    return (
        <div style={{ width: '250px' }} className="d-flex flex-column">
            <Navbar className="jaw-navbar bg-neavy-blue flex-column vh-100" variant="dark" expand={false}>
                <Container fluid className="flex-column align-items-start">
                    <Nav className="flex-column w-100" defaultActiveKey="/home">
                        <Nav.Item> <Nav.Link className="navlink px-2" as={Link} to="/myprofile" active={pathname.includes('myprofile')}> My Profile </Nav.Link> </Nav.Item>
                        <Nav.Item> <Nav.Link className="navlink px-2" as={Link} to="/favorites" active={pathname.includes('search')}> Favorites </Nav.Link> </Nav.Item>
                        <Nav.Item> <Nav.Link className="navlink px-2" as={Link} to="/review" active={pathname.includes('review')}> Review </Nav.Link> </Nav.Item>
                        <Nav.Item> <Nav.Link className="navlink px-2" as={Link} to="/people" active={pathname.includes('people')}> People </Nav.Link> </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}