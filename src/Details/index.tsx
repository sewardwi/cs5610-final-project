import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navigation from '../Navigation'
import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL } from '../TMDb_API/helpers'

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string }[];
  spoken_languages: { english_name: string; name: string }[];
}

interface MovieCredits {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
    department: string;
  }[];
}

interface Comment {
  id: number;
  author: string;
  text: string;
}

export default function Details() {
  const { movieName } = useParams()
  const decodedMovieName = decodeURIComponent(movieName || '')
  
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null)
  const [movieCredits, setMovieCredits] = useState<MovieCredits | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // example comments - change to fetch from backend and database
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: 'MovieFan123', text: 'Amazing movie! One of my all-time favorites.' },
    { id: 2, author: 'CinemaLover', text: 'The special effects were groundbreaking for its time.' }
  ])
  const [newComment, setNewComment] = useState('')
  const [newAuthor, setNewAuthor] = useState('')

  // search for movie and get details
  const fetchMovieDetails = async (movieTitle: string) => {
    if (!movieTitle.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const searchResponse = await fetch(
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(movieTitle)}&language=en-US&page=1`
      );
      
      if (!searchResponse.ok) {
        throw new Error(`Search failed: ${searchResponse.status}`);
      }
      
      const searchData = await searchResponse.json();
      if (searchData.results.length === 0) {
        throw new Error('Movie not found');
      }
      
      const movieId = searchData.results[0].id;
      
      const [detailsResponse, creditsResponse] = await Promise.all([
        fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`),
        fetch(`${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=en-US`)
      ]);
      
      if (!detailsResponse.ok || !creditsResponse.ok) {
        throw new Error('Failed to fetch movie details');
      }
      
      const [detailsData, creditsData] = await Promise.all([
        detailsResponse.json(),
        creditsResponse.json()
      ]);
      
      setMovieDetails(detailsData);
      setMovieCredits(creditsData);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movie details');
      console.error('Error fetching movie details:', err);
    } finally {
      setLoading(false);
    }
  };

  // fetch movie details when component mounts or movie name changes
  useEffect(() => {
    if (decodedMovieName) {
      fetchMovieDetails(decodedMovieName);
    }
  }, [decodedMovieName]);

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

  // helpers
  const getDirector = () => {
    if (!movieCredits) return 'Unknown';
    const director = movieCredits.crew.find(person => person.job === 'Director');
    return director ? director.name : 'Unknown';
  };

  const getMainCast = () => {
    if (!movieCredits) return [];
    return movieCredits.cast.slice(0, 5).map(actor => actor.name);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatGenres = (genres: { name: string }[]) => {
    return genres.map(genre => genre.name).join(', ');
  };

  return (
    <>
      <Navigation />
      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        {!decodedMovieName && (
          <h1 style={{ color: '#333' }}>No movie selected</h1>
        )}

        {decodedMovieName && (
          <>
            {loading && (
              <div style={{ textAlign: 'center', padding: '50px' }}>
                <p>Loading movie details...</p>
              </div>
            )}

            
            {error && (
              <div style={{ 
                padding: '20px', 
                backgroundColor: '#fee', 
                border: '1px solid #fcc',
                borderRadius: '8px',
                color: '#c00',
                marginBottom: '20px'
              }}>
                <h2>Error Loading Movie</h2>
                <p>{error}</p>
                <p>Searched for: "{decodedMovieName}"</p>
              </div>
            )}

            
            {!loading && !error && movieDetails && (
              <>
                {movieDetails.backdrop_path && (
                  <div style={{ 
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${TMDB_IMAGE_BASE_URL}${movieDetails.backdrop_path})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '12px',
                    padding: '40px',
                    marginBottom: '30px',
                    color: 'white'
                  }}>
                    <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
                      {movieDetails.poster_path && (
                        <img 
                          src={`${TMDB_IMAGE_BASE_URL}${movieDetails.poster_path}`}
                          alt={`${movieDetails.title} poster`}
                          style={{ 
                            width: '200px', 
                            height: '300px', 
                            objectFit: 'cover',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                          }}
                        />
                      )}
                      
                      
                      <div style={{ flex: 1 }}>
                        <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>
                          {movieDetails.title}
                        </h1>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', fontSize: '16px' }}>
                          <span>{new Date(movieDetails.release_date).getFullYear()}</span>
                          <span>{formatRuntime(movieDetails.runtime)}</span>
                          <span>⭐ {movieDetails.vote_average.toFixed(1)}/10</span>
                        </div>
                        <p style={{ fontSize: '18px', lineHeight: '1.6', margin: '0' }}>
                          {movieDetails.overview}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                
                <div style={{ 
                  backgroundColor: '#f9f9f9', 
                  padding: '30px', 
                  borderRadius: '12px', 
                  marginBottom: '30px' 
                }}>
                  <h2 style={{ marginTop: '0', color: '#333', marginBottom: '25px' }}>Movie Details</h2>
                  <div style={{ display: 'grid', gap: '20px', fontSize: '16px' }}>
                    <div>
                      <strong>Director:</strong> {getDirector()}
                    </div>
                    <div>
                      <strong>Genres:</strong> {formatGenres(movieDetails.genres)}
                    </div>
                    <div>
                      <strong>Main Cast:</strong> {getMainCast().join(', ')}
                    </div>
                    <div>
                      <strong>Runtime:</strong> {formatRuntime(movieDetails.runtime)}
                    </div>
                    <div>
                      <strong>Release Date:</strong> {new Date(movieDetails.release_date).toLocaleDateString()}
                    </div>
                    {movieDetails.production_companies.length > 0 && (
                      <div>
                        <strong>Production:</strong> {movieDetails.production_companies.map(company => company.name).join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                
                {movieCredits && movieCredits.cast.length > 0 && (
                  <div style={{ marginBottom: '30px' }}>
                    <h2 style={{ color: '#333', marginBottom: '20px' }}>Cast</h2>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
                      gap: '20px' 
                    }}>
                      {movieCredits.cast.slice(0, 10).map(actor => (
                        <a
                          href={`https://www.google.com/search?q=${encodeURIComponent(actor.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                          <div key={actor.id} 
                            style={{ 
                              backgroundColor: 'white', 
                              borderRadius: '8px', 
                              overflow: 'hidden',
                              transition: 'all 0.2s',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#f8f9fa';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'white';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                            }}
                          >
                            {actor.profile_path ? (
                              <img 
                                src={`${TMDB_IMAGE_BASE_URL}${actor.profile_path}`}
                                alt={actor.name}
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                              />
                            ) : (
                              <div style={{ 
                                width: '100%', 
                                height: '200px', 
                                backgroundColor: '#e9ecef',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#6c757d'
                              }}>
                                No Photo
                              </div>
                            )}
                            <div style={{ padding: '15px' }}>
                              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                                {actor.name}
                              </div>
                              <div style={{ color: '#666', fontSize: '14px' }}>
                                {actor.character}
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                
                <div>
                  <h2 style={{ color: '#333', marginBottom: '20px' }}>Comments ({comments.length})</h2>
                  
                  <div style={{ 
                    backgroundColor: '#f0f8ff', 
                    padding: '25px', 
                    borderRadius: '12px', 
                    marginBottom: '25px' 
                  }}>
                    <h3 style={{ marginTop: '0', color: '#333' }}>Add a Comment</h3>
                    <div style={{ display: 'grid', gap: '15px' }}>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        style={{ 
                          padding: '12px', 
                          border: '1px solid #ddd', 
                          borderRadius: '6px',
                          fontSize: '16px'
                        }}
                      />
                      <textarea
                        placeholder="Write your comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={4}
                        style={{ 
                          padding: '12px', 
                          border: '1px solid #ddd', 
                          borderRadius: '6px',
                          fontSize: '16px',
                          resize: 'vertical',
                          minHeight: '50px'
                        }}
                      />
                      <button 
                        onClick={handleAddComment}
                        style={{ 
                          padding: '12px 24px', 
                          backgroundColor: '#007bff', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: '500'
                        }}
                      >
                        Add Comment
                      </button>
                    </div>
                  </div>

                  
                  <div style={{ display: 'grid', gap: '15px' }}>
                    {comments.map(comment => (
                      <div key={comment.id} style={{ 
                        backgroundColor: 'white', 
                        padding: '20px', 
                        border: '1px solid #ddd', 
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          marginBottom: '10px' 
                        }}>
                          <strong style={{ color: '#333' }}>{comment.author}</strong>
                          <span style={{ color: '#666', fontSize: '14px' }}>Just now</span>
                        </div>
                        <p style={{ margin: '0', color: '#555', lineHeight: '1.5' }}>
                          {comment.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
