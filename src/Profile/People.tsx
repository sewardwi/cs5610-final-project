import { ListGroup } from "react-bootstrap";
import { fetchPeople } from "./client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function People({ currentUser }: { currentUser?: any }) {
    const [people, setPeople] = useState<any[]>([]); // Initialize as empty array
    const [followType, setFollowType] = useState('following');
    
    const fetchSavepeople = async (userId: any) => {
        try {
            const peopleData = await fetchPeople(userId);
            console.log('people', peopleData);
            
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
            
            setPeople(validPeople);
        } catch (error) {
            console.error('Error fetching people:', error);
            setPeople([]);
        }
    }
    
    useEffect(() => {
        if (currentUser?._id) {
            fetchSavepeople(currentUser._id);
        }
    }, [followType, currentUser]);

    return (
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
                        {currentUser ? `No ${followType} found.` : 'Loading...'}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
}