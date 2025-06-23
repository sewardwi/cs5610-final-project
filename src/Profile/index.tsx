import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "../Navigation";
import ProfileNavigation from "./ProfileNavigation";
import MyProfile from "./MyProfile";
import Favorites from "./Favorites";
import People from "./People";
import Review from "./Review";
import { useEffect, useState } from "react";
import { fetchUserByUNameUEmail } from "./client";

export default function Profile() {
    useEffect(() => {
        const user = localStorage.getItem('user');
        console.log('user', user);
        if (user) {
            fetchUser(JSON.parse(user));
        }
    }, []);
    const [currentUser, setCurrentUser] = useState<any>();
    const fetchUser = async (user: any) => {
        try {
            const tempUser = await fetchUserByUNameUEmail(user.username, user.email);
            console.log('tempUser', tempUser);
            setCurrentUser(tempUser);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }
    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Navigation />
            <div id="jaw-profile-content" style={{display: 'flex', minHeight: 0 }}> 
                <ProfileNavigation />
                <Routes>
                    <Route path="/" element={<Navigate to="myprofile" />} />
                    <Route path="/myprofile/*" element={<MyProfile currentUser={currentUser} />} />
                    <Route path="/favorites/*" element={<Favorites/>} />
                    <Route path="/review/*" element={<Review />} />
                    <Route path="/people/*" element={<People currentUser={currentUser}/>} />
                </Routes>
            </div>
        </div>
      </>
    );
}