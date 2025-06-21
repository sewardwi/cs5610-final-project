// righn now this page is static. Below is the logic plan for this page:
// we will make api calls in client.ts to fetch the favorites of the user.
// we will display the favorites in a table format using loop.
import { fetchFavorites } from "./client";
import { useEffect, useState } from "react";

export default function Favorites() {

  const [favorites, setFavorites] = useState<any>();
  const fetchSaveFavorites = async (userId:any) => {
    const favs = await fetchFavorites(userId);
    setFavorites(favs);
  }

  useEffect(() => {
    const userId = 1011;
    fetchSaveFavorites(userId);
  }, []);
 


  return (
    <div id="jaw-favorites" style={{ padding: '20px', width: '100%' }}>
        This is the Favorites page. Here you can view your favorite items, articles, or any other content you have marked as favorite.
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '8px' }}>Title</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '8px' }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace the below with your actual favorites data */}
            {favorites && favorites.map((fav:any) => (
              <tr key={fav._id}>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                  <a href={fav.url} target="_blank" rel="noopener noreferrer">{fav.title}</a>
                </td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                  {fav.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}