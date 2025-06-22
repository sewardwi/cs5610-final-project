import { Row, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { updateUser, fetchUserById, addFollowToUser, removeFollowFromUser, fetchFollowRelationFromDb } from "../Profile/client";
import { useParams, useNavigate } from "react-router-dom";

export default function OtherUsersProfile() {
    const { uid } = useParams();
    const navigate = useNavigate();

    // Fetch currently logged-in user data
    const loggedInUser = {
        _id: "1011",
        username: "johny",
        email: "john.doe@email.com",
        password: "asd",
        phone: "+1-555-0999",
        first_name: "John",
        last_name: "Doe",
        bio: "Passionate filmmaker and movie enthusiast with 10+ years in the indust…",
        date_joined: "2022-01-15",
        role: "admin",
        created_at: "2022-01-15T10:30:00Z",
        updated_at: "2024-12-01T14:20:00Z"
    }
    
    const formatDate = (dateString:any) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().slice(0, 10);
    }

    const fetchUser = async (userId: string) => {
        try {
            const user = await fetchUserById(userId);
            setLocalUser(user);
            setLocalUserDefault(user);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

    const [following, setFollowing] = useState<any>();
    const fetchFollowRelation = async (userId: string, loggedInUserId: any ) => {
        try{
            // make sure to pass loggedInUserId before userId.
            const followRelation = await fetchFollowRelationFromDb(loggedInUserId, userId);
            setFollowing(followRelation);
        }catch (error) {
            console.error("Error fetching follow relation:", error);
        }
    }
    const [editing, setEditing] = useState(false);
    const [localUser, setLocalUser] = useState<any>();
    const [localUserDefault, setLocalUserDefault] = useState<any>();
    
    const localUserModify = (field: keyof typeof localUser, value: string) => {
        setLocalUser((prev: any) => ({ ...prev, [field]: value }));
    };
    
    const handleCancel = () => {
        setLocalUser(localUserDefault);
        setEditing(false)
    }
    
    const handleSave = async () => {
        try {
            await updateUser(localUser);
            setEditing(false);
        } catch (error) { console.error("Error updating user:", error); }
    }
    
    const addFollow = async () => {
        const followData = {
            follower_id: String(loggedInUser._id),
            following_id: String(localUser._id)
        };
        const res = await addFollowToUser(followData);
        console.log("Follow added:", res);
        setFollowing(fetchFollowRelation(localUser._id, loggedInUser._id));
    }

    const removeFollow = async () => {
        const res = await removeFollowFromUser(String(loggedInUser._id), String(localUser._id));
        console.log("Follow removed:", res);
        setFollowing(fetchFollowRelation(localUser._id, loggedInUser._id));
    }

    
    useEffect(() => {
        if (!uid) {
            console.log("User ID is required to fetch user profile.");
            navigate('/home');
            return;
        }
        console.log("Fetching user with ID:", uid);
        fetchUser(uid);
        fetchFollowRelation(uid, loggedInUser._id);
    }, [uid, navigate]);

    if (!localUser) {
        return <div>Loading...</div>;
    }

    return (
        <div id="jaw-my-profile" style={{ padding: '20px', width: '100%' }}>
            <Form>
                <Row>
                <Col md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    value={localUser?.username || ""}
                    className="jaw-bg-gray"
                    readOnly={!editing}
                    isInvalid={editing && localUser?.username && !/^[a-zA-Z0-9_]{3,20}$/.test(localUser.username)}
                    onChange={e => localUserModify("username", e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    Username must be 3-20 characters, letters, numbers, or underscores.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    value={localUser?.first_name || ""}
                    className="jaw-bg-gray"
                    readOnly={!editing}
                    isInvalid={editing && localUser?.first_name && localUser.first_name.trim() === ""}
                    onChange={e => localUserModify("first_name", e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    First name is required.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                    value={localUser?.role || ""}
                    className="jaw-bg-gray"
                    disabled={!editing}
                    isInvalid={editing && localUser?.role && !["user", "admin", "critic"].includes(localUser.role)}
                    onChange={e => localUserModify("role", e.target.value)}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="critic">Critic</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    Please select a valid role.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Date Joined</Form.Label>
                <Form.Control
                    type="text"
                    value={formatDate(localUser?.date_joined) || ""}
                    className="jaw-bg-gray"
                    readOnly
                />
                </Form.Group>
                </Col>
                <Col md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={localUser?.email || ""}
                    className="jaw-bg-gray"
                    readOnly={!editing}
                    isInvalid={editing && localUser?.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localUser.email)}
                    onChange={e => localUserModify("email", e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    Please enter a valid email address. 
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    value={localUser?.last_name || ""}
                    className="jaw-bg-gray"
                    readOnly={!editing}
                    isInvalid={editing && localUser?.last_name && localUser.last_name.trim() === ""}
                    onChange={e => localUserModify("last_name", e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    Last name is required.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                    type="text"
                    value={localUser?.phone || ""}
                    className="jaw-bg-gray"
                    readOnly={!editing}
                    isInvalid={editing && localUser?.phone && !/^\+?[0-9\- ]{7,20}$/.test(localUser.phone)}
                    onChange={e => localUserModify("phone", e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    Please enter a valid phone number.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Bio/Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={localUser?.bio || ""}
                    className="jaw-bg-gray"
                    readOnly={!editing}
                    isInvalid={editing && localUser?.bio && localUser.bio.trim().length < 10}
                    onChange={e => localUserModify("bio", e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    Bio must be at least 10 characters.
                </Form.Control.Feedback>
                </Form.Group>
                </Col>
                </Row>
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                {loggedInUser.role === 'admin' && (
                    editing ? (
                        <>
                        <button
                            type="button"
                            className="btn btn-primary"
                            disabled={
                            !localUser?.username || !/^[a-zA-Z0-9_]{3,20}$/.test(localUser.username) ||
                            !localUser?.first_name || localUser.first_name.trim() === "" ||
                            !localUser?.last_name || localUser.last_name.trim() === "" ||
                            !localUser?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localUser.email) ||
                            !localUser?.phone || !/^\+?[0-9\- ]{7,20}$/.test(localUser.phone) ||
                            !["user", "admin", "critic"].includes(localUser.role) ||
                            !localUser?.bio || localUser.bio.trim().length < 10
                            }
                            onClick={e => {
                            e.preventDefault();
                            handleSave();
                            }}
                        >
                            Save 
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={e => {
                            e.preventDefault();
                            handleCancel();
                            }}
                        >
                            Cancel
                        </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={e => {
                                e.preventDefault();
                                setEditing(true);
                            }}
                        >
                            Edit
                        </button>
                    )
                )}
                {following ? 
                (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={e => {
                        e.preventDefault();
                        removeFollow();
                    }}
                >
                    Unfollow
                </button>
                ):
                (<button
                    type="button"
                    className="btn btn-primary"
                    onClick={e => {
                        e.preventDefault();
                        addFollow();
                    }}
                >
                    Follow
                </button>)}
                

                
                </div>
            </Form>
        </div>
    );
}