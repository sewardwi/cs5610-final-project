import { fetchPeople } from "./client";
import { useEffect, useState } from "react";

export default function People() {
      const [people, setPeople] = useState<any>();
      const fetchSavepeople = async (userId:any) => {
        const favs = await fetchPeople(userId);
        setPeople(favs);
      }
    
      useEffect(() => {
        const userId = 1011;
        fetchSavepeople(userId);
      }, []);
     
    return(
        <div id="jaw-people" style={{ padding: '20px', width: '100%' }}>
            This is the People page. Here you can view and manage your connections, friends, or any other people-related content.
            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '8px' }}>Name</th>
                        <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '8px' }}>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Replace the below with your actual people data */}
                    {people && people.map((person:any) => (
                        <tr key={person._id}>
                            <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{person.first_name}</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{person.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}