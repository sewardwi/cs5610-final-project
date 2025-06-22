/* eslint-disable @typescript-eslint/no-explicit-any */
import Navigation from "../Navigation";
import { useState } from "react";
import axios from "axios";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const data = isLogin 
            ? { username, password }
            : { username, password, email };
            
        try {
            const endpoint = isLogin ? '/api/login' : '/api/signup';
            const baseURL = import.meta.env.VITE_REMOTE_SERVER || 'http://localhost:4000';
            const response = await axios.post(`${baseURL}${endpoint}`, data);
            
            if ((response.data as any).success) {
                if (isLogin) {
                    localStorage.setItem('user', JSON.stringify((response.data as any).user));
                    window.location.href = '/';
                } else {
                    setMessage('Account created! You can now login.');
                }
            } else {
                setMessage((response.data as any).message || 'Invalid username or password');
            }
        } catch {
            setMessage('Cannot connect to server');
        }
    };

    return (
        <>
            <Navigation />
            <div className="jaw-content">
                <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
                    <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd' }}
                        />
                        
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd' }}
                        />

                        {!isLogin && (
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ddd' }}
                            />
                        )}

                        <button type="submit" style={{ width: '100%', padding: '10px', margin: '10px 0', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>

                    <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: '#007bff' }}>
                        {isLogin ? 'Need account? Sign up' : 'Have account? Login'}
                    </button>

                    {message && <div style={{ margin: '10px 0', padding: '10px', backgroundColor: '#f0f0f0' }}>{message}</div>}
                </div>
            </div>
        </>
    );
}