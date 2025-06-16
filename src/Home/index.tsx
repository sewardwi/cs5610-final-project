import Navigation  from "../Navigation";
export default function Home (){
    return (
        <>
            <Navigation />
            <div className="jaw-content">
                <h1>Welcome to the Home Page</h1>
                <p>This is a simple React application with a header and navigation links.</p>
            </div>
            
        </>
    );
};