import { Routes, Route, Navigate, Link } from "react-router-dom";
import Navigation from "../Navigation";
import OthersProfilePage from "./OthersProfile";
import OthersFavorites from "./OthersFavorites";
// import People from "./People";
import OthersReviews from "./OthersReviews";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function OthersProfile() {
    const { pathname } = useLocation();
    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Navigation />
            <div id="jaw-profile-content" style={{display: 'flex', minHeight: 0 }}> 
                {/* profile navigation */}
                <div style={{ width: '250px'  }} className="jaw-profile-sidebar">
                    <Navbar className="jaw-navbar bg-neavy-blue flex-column vh-100" variant="dark" expand={false}>
                        <Container fluid className="flex-column align-items-start">
                            <Nav className="flex-column w-100" defaultActiveKey="/home">
                                <Nav.Item> <Nav.Link className="navlink px-2" as={Link} to="/profile/myprofile" active={pathname.includes('myprofile')}> My Profile </Nav.Link> </Nav.Item>
                                <Nav.Item> <Nav.Link className="navlink px-2" as={Link} to="/profile/favorites" active={pathname.includes('favorites')}> Favorites </Nav.Link> </Nav.Item>
                                <Nav.Item> <Nav.Link className="navlink px-2" as={Link} to="/profile/review" active={pathname.includes('review')}> Review </Nav.Link> </Nav.Item>
                                <Nav.Item> <Nav.Link className="navlink px-2" as={Link} to="/profile/people" active={pathname.includes('people')}> People </Nav.Link> </Nav.Item>
                            </Nav>
                        </Container>
                    </Navbar>
                </div>
                <Routes>
                    <Route path="/" element={<Navigate to="myprofile" />} />
                    <Route path="/profile/:uid/**" element={<OthersProfilePage />} />
                    <Route path="/favorites/:uid/*" element={<OthersFavorites />} />
                    <Route path="/reviews/:uid/*" element={<OthersReviews />} />
                    {/* <Route path="/people/*" element={<People />} /> */}
                </Routes>
            </div>
        </div>
      </>
    );
}