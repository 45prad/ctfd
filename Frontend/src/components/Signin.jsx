import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for redirection

const Signin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        const authToken = localStorage.getItem('Hactify-Auth-token');
        if (authToken) {
            navigate('/');
        }
    }, []);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                // Authentication successful, handle redirection
                localStorage.setItem('Hactify-Auth-token', data.authtoken);
                navigate("/"); // Redirect to home page
            } else {
                // Authentication failed, display error message
                setError(data.error);
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            setError('An error occurred during authentication. Please try again.');
            setLoading(false);
        }
    };

    return (
        <>
            {/* Navbar Component */}
            <div className="navbar bg-white h-[50px] w-full shadow-2xl z-5">
                <div className='w-4/6 full mx-auto '>
                    <h1 className='text-blue-900 text-2xl font-extrabold my-auto'>Hacktify</h1>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-screen relative" style={{ backgroundImage: "url('/map_image.jpg')"}}>
                {/* <div className="absolute inset-0 bg-gray-200 opacity-50"></div> */}
                <div className="w-full max-w-xs z-10">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                />
                                <FontAwesomeIcon icon={faLock} className="absolute right-0 mt-3 mr-3 text-gray-500" />
                            </div>
                        </div>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : 'Log In'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signin;
