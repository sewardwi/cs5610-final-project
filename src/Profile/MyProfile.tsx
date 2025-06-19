import { Row, Col, Form } from "react-bootstrap";

export default function MyProfile() {
  return (
    <div id="wd-my-profile" style={{ padding: '20px', width: '100%' }}>
        <Form>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value="johndoe" className="jaw-bg-gray" readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value="johndoe@example.com" className="jaw-bg-gray" readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="text" value="+1 234 567 8901" className="jaw-bg-gray" readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value="John" className="jaw-bg-gray" readOnly />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value="Doe" className="jaw-bg-gray" readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Bio/Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value="Software developer and tech enthusiast." className="jaw-bg-gray" readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date Joined</Form.Label>
                        <Form.Control type="text" value="2023-01-15" className="jaw-bg-gray" readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Control type="text" value="User" className="jaw-bg-gray" readOnly />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    </div>
  );
}