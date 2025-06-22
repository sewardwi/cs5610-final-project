import { Row, Col, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { updateUser } from "./client";

export default function MyProfile({ currentUser }: { currentUser?: any }) {
    useEffect(() => {
        if (currentUser) {
            setLocalUser(currentUser);
        }
    }, [currentUser]); // Add currentUser to dependency array
    
    const [editing, setEditing] = useState(false);
    const [localUser, setLocalUser] = useState<any>();
    
    const localUserModify = (field: keyof typeof localUser, value: string) => {
        setLocalUser((prev: any) => ({ ...prev, [field]: value }));
    };
    
    const handleCancel = () => {
        setLocalUser(currentUser);
        setEditing(false)
    }
    
    const handleSave = () => {
        updateUser(localUser);
        setEditing(false);
    }

    // Helper function to format date to YYYY-MM-DD
    const formatDate = (dateString: any) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().slice(0, 10);
    }

    // Add loading state if localUser is not available
    if (!localUser) {
        return <div>Loading profile...</div>;
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
                    value={localUser?.username || ""} // Add safe navigation
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
                    disabled={!(editing && localUser?.role === "admin")}
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
                {editing ? (
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
                    !localUser?.role || !["user", "admin", "critic"].includes(localUser.role) ||
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
                )}
                </div>
            </Form>
        </div>
    );
}