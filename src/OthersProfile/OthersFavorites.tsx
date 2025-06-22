// righn now this page is static. Below is the logic plan for this page:
// we will make api calls in client.ts to fetch the Othersfavorites of the user.
// we will display the Othersfavorites in a table format using loop.
import { Link } from "react-router-dom";
import { fetchOthersFavorites } from "../Profile/client";
import { useEffect, useState } from "react";

export default function OthersFavorites({ uid }: { uid?: any }) {

  const [othersFavorites, setOthersFavorites] = useState<any>();
  const fetchSaveOthersFavorites = async () => {
    const favs = await fetchOthersFavorites(uid);
    setOthersFavorites(favs);
  }

  useEffect(() => {
    fetchSaveOthersFavorites();
  }, []);

  return (
    <div id="jaw-Othersfavorites" style={{ padding: '20px', width: '100%' }}>
        This is the OthersFavorites page. Here you can view your favorite items, articles, or any other content you have marked as favorite.
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '8px' }}>Title</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '8px' }}>Link</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace the below with your actual Othersfavorites data */}
            {othersFavorites && othersFavorites.map((fav:any) => (
              <tr key={fav._id}>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                  <a href={fav.url} target="_blank" rel="noopener noreferrer">{fav.title}</a>
                </td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                  <Link to={`/details/${fav.movie_id}`} target="_blank" rel="noopener noreferrer">
                    <button type="button" className="btn btn-success">GO</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}