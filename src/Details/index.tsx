import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navigation from '../Navigation'

export default function Details() {
  const { movieName } = useParams()
  const decodedMovieName = decodeURIComponent(movieName || '')
  
  // example comments - come from backend
  const [comments, setComments] = useState([
    { id: 1, author: 'MovieFan123', text: 'Amazing movie! One of my all-time favorites.' },
    { id: 2, author: 'CinemaLover', text: 'The special effects were groundbreaking for its time.' }
  ])
  const [newComment, setNewComment] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  // example movie details
  const movieDetails = {
    "The Matrix": {
      year: 1999,
      director: 'The Wachowskis',
      genre: 'Sci-Fi, Action',
      rating: '8.7/10',
      duration: '136 min',
      plot: 'A computer programmer discovers that reality as he knows it is a simulation controlled by machines.',
      cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss', 'Hugo Weaving']
    },
    "Inception": {
      year: 2010,
      director: 'Christopher Nolan',
      genre: 'Sci-Fi, Thriller',
      rating: '8.8/10',
      duration: '148 min',
      plot: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.',
      cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy', 'Ellen Page']
    },
    "Interstellar": {
      year: 2014,
      director: 'Christopher Nolan', 
      genre: 'Sci-Fi, Drama',
      rating: '8.6/10',
      duration: '169 min',
      plot: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
      cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine']
    }
  }

  const currentMovie = movieDetails[decodedMovieName as keyof typeof movieDetails] || {
    year: 'Unknown',
    director: 'Unknown',
    genre: 'Unknown',
    rating: 'N/A',
    duration: 'Unknown',
    plot: 'Details not available for this movie.',
    cast: []
  }

  const handleAddComment = () => {
    if (newComment.trim() && newAuthor.trim()) {
      const comment = {
        id: comments.length + 1,
        author: newAuthor.trim(),
        text: newComment.trim()
      }
      setComments([...comments, comment])
      setNewComment('')
      setNewAuthor('')
    }
  }

  return (
    <>
      <Navigation />
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        {!decodedMovieName && (
          <h1 style={{ color: '#333' }}>No movie selected</h1>
        )}

        {decodedMovieName && (<>
          {/* Movie Header */}
          <div style={{ marginBottom: '30px' }}>
            <h1 style={{ color: '#333', marginBottom: '10px' }}>{decodedMovieName}</h1>
            <div style={{ display: 'flex', gap: '20px', color: '#666', fontSize: '14px' }}>
              <span>{currentMovie.year}</span>
              <span>{currentMovie.duration}</span>
              <span>⭐ {currentMovie.rating}</span>
            </div>
          </div>

          {/* Movie Details */}
          <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
            <h2 style={{ marginTop: '0', color: '#333' }}>Movie Details</h2>
            <div style={{ display: 'grid', gap: '15px' }}>
              <div>
                <strong>Director:</strong> {currentMovie.director}
              </div>
              <div>
                <strong>Genre:</strong> {currentMovie.genre}
              </div>
              <div>
                <strong>Cast:</strong> {currentMovie.cast.join(', ')}
              </div>
              <div>
                <strong>Plot:</strong> {currentMovie.plot}
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>Comments ({comments.length})</h2>
            
            {/* Add Comment Form */}
            <div style={{ 
              backgroundColor: '#f0f8ff', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '20px' 
            }}>
              <h3 style={{ marginTop: '0', color: '#333' }}>Add a Comment</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Your name"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  style={{ 
                    padding: '8px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
                <textarea
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  style={{ 
                    padding: '8px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
                <button 
                  onClick={handleAddComment}
                  style={{ 
                    padding: '10px 20px', 
                    backgroundColor: '#007bff', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Add Comment
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div style={{ display: 'grid', gap: '15px' }}>
              {comments.map(comment => (
                <div key={comment.id} style={{ 
                  backgroundColor: 'white', 
                  padding: '15px', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '8px' 
                  }}>
                    <strong style={{ color: '#333' }}>{comment.author}</strong>
                    <span style={{ color: '#666', fontSize: '12px' }}>Just now</span>
                  </div>
                  <p style={{ margin: '0', color: '#555', lineHeight: '1.4' }}>
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>)}
      </div>
    </>
  );
}