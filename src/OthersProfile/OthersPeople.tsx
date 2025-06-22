import { ListGroup} from "react-bootstrap";
import { fetchPeople } from "../Profile/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OtherPeople({ uid }: { uid?: any }) {
    const [people, setPeople] = useState<any>();
    const [followType, setFollowType] = useState('following');
    const fetchSavepeople = async () => {
        const people = await fetchPeople(uid);
        if (followType === 'followers') {
            setPeople((people as any).followersData);
        }
        else {  
            setPeople((people as any).followingData);
        }
    }
      useEffect(() => {
        fetchSavepeople();
      }, [followType]);
     
    return(
        
    <div id="jaw-people" style={{ padding: '20px', width: '100%' }}>
        This is the People page. Here you can view followers and followings of other users content.
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <select
                value={followType}
                onChange={e => setFollowType(e.target.value)}
                style={{ padding: '5px 10px', borderRadius: '4px' }}
            >
                <option value="following">Following</option>
                <option value="followers">Followers</option>
            </select>
        </div>
        <ListGroup style={{ marginTop: '20px' }}>
            <ListGroup.Item variant="secondary" style={{ fontWeight: 'bold' }}>
                Name
            </ListGroup.Item>
            {people && people.map((person: any) => (
                <ListGroup.Item key={person._id}>
                    <Link
                        to={`/otherprofile/${person._id}`}
                        target=""
                        className="text-decoration-none"
                        rel="noopener noreferrer"
                    >
                        {person.first_name}
                    </Link>
                </ListGroup.Item>
            ))}
        </ListGroup>
    </div>
)}