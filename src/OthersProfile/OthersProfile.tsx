import { Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { updateUser } from "../Profile/client";

export default function OthersProfile() {
    const initialUser = {
        _id: "1011",
        username: "johny",
        email: "john.doe@email.com",
        password: "asd",
        phone: "+1-555-0999",
        first_name: "John",
        last_name: "Doe",
        bio: "Passionate filmmaker and movie enthusiast with 10+ years in the indust…",
        date_joined: "2022-01-15",
        role: "content_creator",
        created_at: "2022-01-15T10:30:00Z",
        updated_at: "2024-12-01T14:20:00Z"
    }
    const [editing, setEditing] = useState(false);
    const [localUser, setLocalUser] = useState(initialUser);
    const localUserModify = (field: keyof typeof localUser, value: string) => {
        setLocalUser(prev => ({ ...prev, [field]: value }));
    };
    const handleCancel = () => {
        setLocalUser(initialUser);
        setEditing(false)
    }
    const handleSave = () => {
        // Here we will dispatch an action to update the user in Redux in client.ts
        // Here will be code to update the user in the backend
        updateUser(localUser);
        setEditing(false);
    }


    // logic:
    // ✔️ We will save current user which we will get from redux from session in temporary state.
    // ✔️ When user edits, we will change the temporary state 
    // When user clicks save, we will dispatch an action to update the user in redux and also update the user in the backend : backend done, redux-blocked
    // ✔️ When user clicks cancel, we will reset the temporary state to the original user data from redux 
    // add validations to form fields.
    // add condition so that only admin can edit this form
  return (
    <div id="jaw-my-profile" style={{ padding: '20px', width: '100%' }}>
        <Form>
            <Row>
            <Col md={6}>
            <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
                type="text"
                value={localUser.username}
                className="jaw-bg-gray"
                readOnly={!editing}
                isInvalid={editing && !/^[a-zA-Z0-9_]{3,20}$/.test(localUser.username)}
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
                value={localUser.first_name}
                className="jaw-bg-gray"
                readOnly={!editing}
                isInvalid={editing && localUser.first_name.trim() === ""}
                onChange={e => localUserModify("first_name", e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
                First name is required.
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
                value={localUser.role}
                className="jaw-bg-gray"
                disabled={!editing}
                isInvalid={editing && !["user", "admin", "premium_user", "content_creator"].includes(localUser.role)}
                onChange={e => localUserModify("role", e.target.value)}
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="premium_user">Premium User</option>
                <option value="content_creator">Content Creator</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                Please select a valid role.
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Date Joined</Form.Label>
            <Form.Control
                type="text"
                value={localUser.date_joined}
                className="jaw-bg-gray"
                readOnly
            />
            <Form.Control.Feedback type="invalid">
                Date must be in YYYY-MM-DD format.
            </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="email"
                value={localUser.email}
                className="jaw-bg-gray"
                readOnly={!editing}
                isInvalid={editing && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localUser.email)}
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
                value={localUser.last_name}
                className="jaw-bg-gray"
                readOnly={!editing}
                isInvalid={editing && localUser.last_name.trim() === ""}
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
                value={localUser.phone}
                className="jaw-bg-gray"
                readOnly={!editing}
                isInvalid={editing && !/^\+?[0-9\- ]{7,20}$/.test(localUser.phone)}
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
                value={localUser.bio}
                className="jaw-bg-gray"
                readOnly={!editing}
                isInvalid={editing && localUser.bio.trim().length < 10}
                onChange={e => localUserModify("bio", e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
                Bio must be at least 10 characters.
            </Form.Control.Feedback>
            </Form.Group>
            </Col>
            </Row>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {localUser.role === 'Admin' && editing ? (
            <>
            <button
                type="button"
                className="btn btn-primary"
                disabled={
                !/^[a-zA-Z0-9_]{3,20}$/.test(localUser.username) ||
                localUser.first_name.trim() === "" ||
                localUser.last_name.trim() === "" ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localUser.email) ||
                !/^\+?[0-9\- ]{7,20}$/.test(localUser.phone) ||
                !["user", "admin", "premium_user", "content_creator"].includes(localUser.role) ||
                !/^\d{4}-\d{2}-\d{2}$/.test(localUser.date_joined) ||
                localUser.bio.trim().length < 10
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