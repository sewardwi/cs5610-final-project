/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
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

  return (
    <>
      <h1>Placeholder Search Bar to Navigate to Search Page</h1>
      <div className="card">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter search term..."
            style={{ padding: '8px', fontSize: '16px', flex: 1 }}
          />
          <button onClick={handleSearch} style={{ padding: '8px 16px', fontSize: '16px' }}>
            Search
          </button>
        </div>
      </div>
    </>
  )
}