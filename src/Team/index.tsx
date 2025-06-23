import Navigation from "../Navigation";

export default function Team() {

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2>Team Members</h2>
        <ul>
          <li key={'jaimin'} style={{ marginBottom: '8px' }}>
            Jaimin Savaliya
          </li>
          <li key={'advay'} style={{ marginBottom: '8px' }}>
            Advay Ramesh
          </li>
          <li key={'william'} style={{ marginBottom: '8px' }}>
            William Seward
          </li>
        </ul>

        <h2>Project Repositories</h2>
        <ul>
          <li key={'front'} style={{ marginBottom: '8px' }}>
            Frontend: <a href="https://github.com/sewardwi/cs5610-final-project" target="_blank" rel="noopener noreferrer">https://github.com/sewardwi/cs5610-final-project</a>
          </li>
          <li key={'back'} style={{ marginBottom: '8px' }}>
            Backend: <a href="https://github.com/jaiminsavaliya316/server-cs5610-final-project" target="_blank" rel="noopener noreferrer">https://github.com/jaiminsavaliya316/server-cs5610-final-project</a>
          </li>
        </ul>
      </div>
    </>
  );
};