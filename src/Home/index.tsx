/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import Navigation from '../Navigation';
import { useState, useEffect } from 'react';
import { type Movie, type TMDBResponse, TMDB_API_KEY, TMDB_BASE_URL, TMDB_IMAGE_BASE_URL } from '../TMDb_API/helpers';
import { fetchFavorites } from '../Profile/client';

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [favorites, setFavorites] = useState<any[]>([])

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [popularResponse, topRatedResponse] = await Promise.all([
        fetch(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`),
        fetch(`${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`)
      ]);
      
      if (!popularResponse.ok || !topRatedResponse.ok) {
        throw new Error('HTTP error! Failed to fetch movies');
      }
      
      const [popularData, topRatedData]: [TMDBResponse, TMDBResponse] = await Promise.all([
        popularResponse.json(),
        topRatedResponse.json()
      ]);
      
      setPopularMovies(popularData.results.slice(0, 10));
      setTopRatedMovies(topRatedData.results.slice(0, 10));
    } catch (err) {
      setError('Failed to fetch movies. Please check your API key and try again.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
    
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setCurrentUser(userData);
        
        if (userData._id) {
          fetchFavorites(userData._id.toString())
            .then(async (data) => {
              const favoritesArray = Array.isArray(data) ? data : [];
              
              const favoritesWithPosters = await Promise.all(
                favoritesArray.slice(0, 10).map(async (fav: any) => {
                  try {
                    const response = await fetch(`${TMDB_BASE_URL}/movie/${fav.movie_id}?api_key=${TMDB_API_KEY}`);
                    const movieData = await response.json();
                    return { ...fav, poster_path: movieData.poster_path, title: movieData.title };
                  } catch {
                    return fav;
                  }
                })
              );
              
              setFavorites(favoritesWithPosters);
            })
            .catch(err => console.log('Error fetching favorites:', err));
        }
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <>
      <Navigation />
      <div className="jaw-content">
        
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

        {!loading && !error && popularMovies.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h3>Movies Trending Now</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(5, 1fr)', 
              gap: '15px', 
              marginTop: '15px' 
            }}>
              {popularMovies.map(movie => (
                <Link 
                  key={movie.id}
                  to={`/details/${encodeURIComponent(movie.id)}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '15px', 
                    border: '1px solid #ddd', 
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    height: '400px'
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
                    <div style={{ marginBottom: '15px', flexShrink: 0 }}>
                      {movie.poster_path ? (
                        <img 
                          src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                          alt={`${movie.title} poster`}
                          style={{ 
                            width: '100%', 
                            height: '200px', 
                            objectFit: 'cover',
                            borderRadius: '4px'
                          }}
                        />
                      ) : (
                        <div style={{ 
                          width: '100%', 
                          height: '200px', 
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
                        fontSize: '16px',
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
                          fontWeight: '500'
                        }}>
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>

                      <p style={{ 
                        margin: '0', 
                        color: '#666', 
                        fontSize: '12px',
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

        {currentUser && (
          <div style={{ marginTop: '40px' }}>
            <h3>Your Favorites</h3>
            {favorites.length > 0 ? (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(5, 1fr)', 
                gap: '15px', 
                marginTop: '15px' 
              }}>
                {favorites.map((favorite: any, index: number) => (
                  <Link 
                    key={index}
                    to={`/details/${encodeURIComponent(favorite.movieId || favorite.movie_id)}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={{
                      padding: '15px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      textAlign: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      height: '300px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      {favorite.poster_path ? (
                        <img 
                          src={`${TMDB_IMAGE_BASE_URL}${favorite.poster_path}`}
                          alt={`${favorite.title} poster`}
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '4px',
                            marginBottom: '10px'
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '200px',
                          backgroundColor: '#e9ecef',
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '10px',
                          fontSize: '12px',
                          color: '#6c757d'
                        }}>
                          No Image
                        </div>
                      )}
                      <h4 style={{ margin: '0', fontSize: '14px', fontWeight: '600' }}>
                        {favorite.title || 'Movie'}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={{ padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                <p>No favorites yet</p>
                <p style={{ fontSize: '14px', color: '#666' }}>Add movies to favorites from their detail pages</p>
              </div>
            )}
          </div>
        )}

        {!loading && !error && topRatedMovies.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            <h3>All-Time Greatest Movies:</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(5, 1fr)', 
              gap: '15px', 
              marginTop: '15px' 
            }}>
              {topRatedMovies.map(movie => (
                <Link 
                  key={movie.id}
                  to={`/details/${encodeURIComponent(movie.id)}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '15px', 
                    border: '1px solid #ddd', 
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    height: '400px'
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
                    <div style={{ marginBottom: '15px', flexShrink: 0 }}>
                      {movie.poster_path ? (
                        <img 
                          src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                          alt={`${movie.title} poster`}
                          style={{ 
                            width: '100%', 
                            height: '200px', 
                            objectFit: 'cover',
                            borderRadius: '4px'
                          }}
                        />
                      ) : (
                        <div style={{ 
                          width: '100%', 
                          height: '200px', 
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
                        fontSize: '16px',
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
                          fontWeight: '500'
                        }}>
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>

                      <p style={{ 
                        margin: '0', 
                        color: '#666', 
                        fontSize: '12px',
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
      </div>
    </>
  );
}