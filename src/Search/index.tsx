/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navigation from '../Navigation';
import { useState, useEffect } from 'react';
import { type Movie, type TMDBResponse, TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL } from '../TMDb_API/helpers';

export default function Search() {
  const { movie } = useParams()
  const decodedMovie = decodeURIComponent(movie || '')
  
  const [searchText, setSearchText] = useState(decodedMovie)
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // search movies using TMDB API
  const searchMovies = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: TMDBResponse = await response.json();
      const sortedMovies = data.results.sort((a, b) => b.vote_average - a.vote_average);
      setMovies(sortedMovies);
    } catch (err) {
      setError('Failed to fetch movies. Please check your API key and try again.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  // search when URL parameter changes
  useEffect(() => {
    if (decodedMovie) {
      searchMovies(decodedMovie);
    }
  }, [decodedMovie]);

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/search/${encodeURIComponent(searchText.trim())}`)
    }
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <>
      <Navigation />
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter search term..."
            style={{ padding: '8px', fontSize: '16px', flex: 1 }}
          />
          <button onClick={handleSearch} style={{ padding: '8px 16px', fontSize: '16px' }}>
            Search
          </button>
        </div>

        
        {decodedMovie && (
          <>
            <h1>Search Results</h1>
            <p>You searched for: <strong>{decodedMovie}</strong></p>
          
            
            {loading && (
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <p>Loading movies...</p>
              </div>
            )}

            
            {error && (
              <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                backgroundColor: '#fee', 
                border: '1px solid #fcc',
                borderRadius: '5px',
                color: '#c00'
              }}>
                <p>{error}</p>
              </div>
            )}

            
            {!loading && !error && movies.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <h3>Found {movies.length} movies for "{decodedMovie}":</h3>
                <div style={{ display: 'grid', gap: '15px', marginTop: '15px' }}>
                  {movies.map(movie => (
                    <Link 
                      key={movie.id}
                      to={`/details/${encodeURIComponent(movie.id)}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div style={{ 
                        display: 'flex',
                        padding: '15px', 
                        border: '1px solid #ddd', 
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
                        
                        <div style={{ marginRight: '15px', flexShrink: 0 }}>
                          {movie.poster_path ? (
                            <img 
                              src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                              alt={`${movie.title} poster`}
                              style={{ 
                                width: '80px', 
                                height: '120px', 
                                objectFit: 'cover',
                                borderRadius: '4px'
                              }}
                            />
                          ) : (
                            <div style={{ 
                              width: '80px', 
                              height: '120px', 
                              backgroundColor: '#e9ecef',
                              borderRadius: '4px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#6c757d',
                              fontSize: '12px',
                              textAlign: 'center'
                            }}>
                              No Image
                            </div>
                          )}
                        </div>

                        
                        <div style={{ flex: 1 }}>
                          <h4 style={{ 
                            margin: '0 0 8px 0', 
                            color: '#333',
                            fontSize: '18px',
                            fontWeight: '600'
                          }}>
                            {movie.title}
                          </h4>
                          
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '15px',
                            marginBottom: '8px'
                          }}>
                            {movie.release_date && (
                              <span style={{ 
                                color: '#666', 
                                fontSize: '14px',
                                fontWeight: '500'
                              }}>
                                {new Date(movie.release_date).getFullYear()}
                              </span>
                            )}
                            
                            <span style={{ 
                              color: '#007bff', 
                              fontSize: '14px',
                              fontWeight: '500',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              ⭐ {movie.vote_average.toFixed(1)}
                            </span>
                          </div>

                          <p style={{ 
                            margin: '0', 
                            color: '#666', 
                            fontSize: '14px',
                            lineHeight: '1.4',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {movie.overview || 'No description available.'}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            
            {!loading && !error && movies.length === 0 && decodedMovie && (
              <div style={{ 
                marginTop: '20px', 
                padding: '20px',
                textAlign: 'center',
                color: '#666'
              }}>
                <p>No movies found for "{decodedMovie}". Try a different search term.</p>
              </div>
            )}
          </>
        )}

        {!decodedMovie && (
          <div style={{ marginTop: '20px', color: '#888' }}>
            <p>No search query provided. Please enter a search term.</p>
          </div>
        )}
      </div>
    </>
  );
}
