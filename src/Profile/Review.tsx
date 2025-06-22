import { Link } from "react-router-dom";
import { fetchReviews } from "./client";
import { useEffect, useState } from "react";

export default function Review() {
  const [reviews, setReviews] = useState<any>();
  const fetchSaveReviews = async (userId:any) => {
    const rews = await fetchReviews(userId);
    setReviews(rews);
  }

  useEffect(() => {
    const userId = 1011;
    fetchSaveReviews(userId);
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
              {/* Replace the below with your actual reviews data */}
              {reviews && reviews.map((rev:any) => (
                <tr key={rev.id}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    {rev.title}
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
                    <Link to={`/details/${rev.movie_id}`} target="_blank" rel="noopener noreferrer">
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