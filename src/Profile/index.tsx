import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "../Navigation";
import ProfileNavigation from "./ProfileNavigation";
import MyProfile from "./MyProfile";
import Favorites from "./Favorites";
import People from "./People";
import Review from "./Review";

export default function Profile() {
    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Navigation />
            <div id="jaw-profile-content" style={{display: 'flex', minHeight: 0 }}> 
                <ProfileNavigation />
                <Routes>
                    <Route path="/" element={<Navigate to="myprofile" />} />
                    <Route path="/myprofile/*" element={<MyProfile />} />
                    <Route path="/favorites/*" element={<Favorites />} />
                    <Route path="/review/*" element={<Review />} />
                    <Route path="/people/*" element={<People />} />
                </Routes>
            </div>
        </div>
      </>
    );
}