import { Link } from "react-router-dom";
import { fetchReviews } from "../Profile/client";
import { useEffect, useState } from "react";

export default function OthersReviews({ uid }: { uid?: any }) {
  const [reviews, setReviews] = useState<any>();
  const fetchSaveReviews = async () => {
    const rews = await fetchReviews(uid);
    setReviews(rews);
  }

  useEffect(() => {
    if (!uid) {
      console.error("User ID is required to fetch reviews.");
      return;
    }
    fetchSaveReviews();
  }, []);
    return (
      <div id="jaw-reviews" style={{ padding: '20px', width: '100%' }}>
          This is the Reviews page. Here you can view your reviews on moviews.
          <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '8px' }}>Title</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '8px' }}>Link</th>
              </tr>
            </thead>
            <tbody>
            {reviews && reviews.length > 0 ? (
              reviews.map((rev: any) => (
                <tr key={rev.id}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    <a href={rev.url} target="" rel="noopener noreferrer">{rev.title}</a>
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    <Link to={`/details/${rev.movie_id}`} target="" rel="noopener noreferrer">
                      <button type="button" className="btn btn-success">GO</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} style={{ padding: '8px', textAlign: 'center', fontStyle: 'italic' }}>
                  No reviews found.
                </td>
              </tr>
            )}
            </tbody>
          </table>
      </div>
    );
  }