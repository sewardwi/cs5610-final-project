import { ListGroup} from "react-bootstrap";
import { fetchPeople } from "./client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function People() {
    const [people, setPeople] = useState<any>();
    const [followType, setFollowType] = useState('following');
    const fetchSavepeople = async (userId:any) => {
        const people = await fetchPeople(userId);
        if (followType === 'followers') {
            setPeople((people as any).followersData);
        }
        else {  
            setPeople((people as any).followingData);
        }
    }
    
      useEffect(() => {
        const userId = 1011;
        fetchSavepeople(userId);
      }, [followType]);


     
    return(
        
    <div id="jaw-people" style={{ padding: '20px', width: '100%' }}>
        This is the People page. Here you can view and manage your connections, friends, or any other people-related content.
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
            {console.log("people:", people)}
            {people && people.map((person: any) => (
                <ListGroup.Item key={person._id}>
                    <Link
                        to={`/otherprofile/${person._id}`}
                        target="_blank"
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