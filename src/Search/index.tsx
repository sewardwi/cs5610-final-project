/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navigation from '../Navigation';
import { useState } from 'react';

export default function Search() {
  const { movie } = useParams()
  const decodedMovie = decodeURIComponent(movie || '')

  console.log(movie, decodedMovie);

  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()

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

  // get these from the API (these are just examples)
  const exampleMovieNames = ['Inception', 'The Matrix', 'Interstellar', 'The Godfather', 'Pulp Fiction']

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

        {/* Display the search query and results only if there is an argument to the search URL */}
        {decodedMovie && (
          <>
            <h1>Search Results</h1>
            <p>You searched for: <strong>{decodedMovie}</strong></p>
          
            <div style={{ marginTop: '20px' }}>
              <h2>Movie Information:</h2>
              <ul>
                <li>Raw query parameter: {movie}</li>
                <li>Decoded query: {decodedMovie}</li>
                <li>Movie length: {decodedMovie.length} characters</li>
                <li>Movie is empty: {decodedMovie ? 'No' : 'Yes'}</li>
              </ul>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h3>Movie Results for "{decodedMovie}":</h3>
              <div style={{ display: 'grid', gap: '10px', marginTop: '10px' }}>
                {exampleMovieNames.map(movieName => (
                  <Link 
                    key={movieName}
                    to={`/details/${encodeURIComponent(movieName)}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={{ 
                      padding: '15px', 
                      border: '1px solid #ddd', 
                      borderRadius: '5px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{movieName}</h4>
                      <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                        Click to view details about {movieName}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
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


// {/* This is where you would typically make an API call or filter data */}
// <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
//   <h3>Next Steps:</h3>
//   <p>In a real application, you would:</p>
//   <ul>
//     <li>Make an API call with the query: <code>fetch(`/api/search?q=${encodeURIComponent(decodedMovie)}`)</code></li>
//     <li>Filter local data based on the query</li>
//     <li>Display search results</li>
//     <li>Handle loading and error states</li>
//   </ul>
// </div>