import { Routes, Route, Navigate, Link, useParams } from "react-router-dom";
import Navigation from "../Navigation";
import OthersProfilePage from "./OtherUsersProfile";
import OthersFavorites from "./OthersFavorites";
// import People from "./People";
import OthersReviews from "./OthersReviews";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function OthersProfile() {
    const { uid } = useParams();
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
                            <Nav className="flex-column w-100">
                                <Nav.Item> <Nav.Link className="navlink px-2" as={Link} to={`/otherprofile/${uid}/oprofile`} active={pathname.includes('oprofile')}> Profile </Nav.Link> </Nav.Item>
                                <Nav.Item> <Nav.Link className="navlink px-2" as={Link} to={`/otherprofile/${uid}/favorites`} active={pathname.includes('favorites')}> Favorites </Nav.Link> </Nav.Item>
                                <Nav.Item> <Nav.Link className="navlink px-2" as={Link} to={`/otherprofile/${uid}/reviews`} active={pathname.includes('review')}> Review </Nav.Link> </Nav.Item>
                                <Nav.Item> <Nav.Link className="navlink px-2" as={Link} to={`/otherprofile/${uid}/people`} active={pathname.includes('people')}> People </Nav.Link> </Nav.Item>
                            </Nav>
                        </Container>
                    </Navbar>
                </div>
                <Routes>
                    <Route path="/" element={<Navigate to={`/otherprofile/${uid}/oprofile`} />} />
                    <Route path="/oprofile/*" element={<OthersProfilePage />} />
                    <Route path="/favorites/*" element={<OthersFavorites uid={uid} />} />
                    <Route path="/reviews/*" element={<OthersReviews />} />
                    {/* <Route path="/people/*" element={<People />} /> */}
                </Routes>
            </div>
        </div>
      </>
    );
}