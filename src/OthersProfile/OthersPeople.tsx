import { ListGroup } from "react-bootstrap";
import { fetchPeople } from "../Profile/client";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function OtherPeople() {
    const { uid } = useParams();
    const [people, setPeople] = useState<any[]>([]); // Initialize as empty array
    const [followType, setFollowType] = useState('following');
    
    const fetchSavepeople = async (userId: any) => {
        try {
            if (!userId) {
                console.error("No user ID provided");
                setPeople([]);
                return;
            }
            
            const peopleData = await fetchPeople(userId);
            console.log("Raw people data:", peopleData);
            
            let rawData;
            if (followType === 'followers') {
                rawData = (peopleData as any)?.followersData || [];
            } else {  
                rawData = (peopleData as any)?.followingData || [];
            }
            
            // Filter out null, undefined, and invalid entries
            const validPeople = rawData.filter((person: any) => 
                person !== null && 
                person !== undefined && 
                person._id && 
                typeof person === 'object'
            );
            
            console.log("Valid people after filtering:", validPeople);
            setPeople(validPeople);
        } catch (error) {
            console.error('Error fetching people:', error);
            setPeople([]);
        }
    }
    
    useEffect(() => {
        if (uid) {
            fetchSavepeople(uid);
        }
    }, [followType, uid]);

    return (
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

                {people.length > 0 ? (
                    people.map((person: any) => (
                        <ListGroup.Item key={person._id}>
                            <Link
                                to={`/otherprofile/${person._id}`}
                                target="_blank"
                                className="text-decoration-none"
                                rel="noopener noreferrer"
                            >
                                {person.first_name || 'Unknown User'}
                            </Link>
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item style={{ textAlign: 'center', fontStyle: 'italic' }}>
                        {uid ? `No ${followType} found.` : 'No user selected.'}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
}