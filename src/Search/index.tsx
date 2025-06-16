import { useParams, Link } from 'react-router-dom'

export default function Search() {
  const { query } = useParams()
  
  // Decode the URL-encoded query parameter
  const decodedQuery = decodeURIComponent(query || '')

  const exampleMovieNames = ['Inception', 'The Matrix', 'Interstellar', 'The Godfather', 'Pulp Fiction']

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Results</h1>
      <p>You searched for: <strong>{decodedQuery}</strong></p>
      
      {/* Example of how you might use the query */}
      <div style={{ marginTop: '20px' }}>
        <h2>Query Information:</h2>
        <ul>
          <li>Raw query parameter: {query}</li>
          <li>Decoded query: {decodedQuery}</li>
          <li>Query length: {decodedQuery.length} characters</li>
          <li>Query is empty: {decodedQuery ? 'No' : 'Yes'}</li>
        </ul>
      </div>

      {/* This is where you would typically make an API call or filter data */}
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
        <h3>Next Steps:</h3>
        <p>In a real application, you would:</p>
        <ul>
          <li>Make an API call with the query: <code>fetch(`/api/search?q=${encodeURIComponent(decodedQuery)}`)</code></li>
          <li>Filter local data based on the query</li>
          <li>Display search results</li>
          <li>Handle loading and error states</li>
        </ul>
      </div>

      {/* Movie search results */}
      {decodedQuery && (
        <div style={{ marginTop: '20px' }}>
          <h3>Movie Results for "{decodedQuery}":</h3>
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
      )}
    </div>
  )
}