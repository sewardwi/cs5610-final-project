import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "../Navigation";
import ProfileNavigation from "./ProfileNavigation";
import MyProfile from "./MyProfile";

export default function Profile() {
    return (
        <>
        <Navigation />
        <div id="jaw-profile-content" style={{ display: 'flex', flexDirection: 'row' }}>
            <ProfileNavigation />
            <Routes>
                <Route path="/" element={<Navigate to="myprofile" />} />
                <Route path="/myprofile/*" element={<MyProfile />} />
            </Routes>
        </div>
      </>
    );
}