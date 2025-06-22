/* eslint-disable @typescript-eslint/no-explicit-any */
// righn now this page is static. Below is the logic plan for this page:
// we will make api calls in client.ts to fetch the favorites of the user.
// we will display the favorites in a table format using loop.
import { Link } from "react-router-dom";
import { fetchFavorites } from "./client";
import { useEffect, useState } from "react";

export default function Favorites({ currentUser }: { currentUser?: any }) {

  const [favorites, setFavorites] = useState<any>();
  const fetchSaveFavorites = async (userId:any) => {
    const favs = await fetchFavorites(userId);
    setFavorites(favs);
  }

  useEffect(() => {
    const userId = currentUser.id;
    fetchSaveFavorites(userId);
  }, []);
 


  return (
    <div id="jaw-favorites" style={{ padding: '20px', width: '100%' }}>
        This is the Favorites page. Here you can view your favorite items, articles, or any other content you have marked as favorite.
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '8px' }}>Title</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '8px' }}>Link</th>
            </tr>
          </thead>
          <tbody>
            {favorites && favorites.length > 0 ? (
              favorites.map((fav: any) => (
                <tr key={fav._id}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    {fav.title}
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    <Link to={`/details/${fav.movie_id}`} target="" rel="noopener noreferrer">
                      <button type="button" className="btn btn-success">GO</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} style={{ padding: '8px', textAlign: 'center', fontStyle: 'italic' }}>
                  No favorites found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
  );
}