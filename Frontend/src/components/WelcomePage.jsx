
import React, { useState, useEffect } from 'react';

const Welcome = () => {
    const apiUrl = import.meta.env.VITE_Backend_URL;
    const [eventDetails, setEventDetails] = useState({
        url: '',
        title: '',
        description: ''
    });

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/config/eventDetails`);
                if (response.ok) {
                    const data = await response.json();
                    setEventDetails(data);
                } else {
                    console.error('Failed to fetch event details');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchEventDetails();
    }, []);

    return (
        <div className="h-screen flex flex-col items-center bg-white -z-50">
            {/* Header */}
            {/* Main Content */}
            <div className="flex flex-col items-center justify-center flex-grow p-8">
                <img 
                    src={`${apiUrl}${eventDetails.url}` ||"\Cyber Suraksha.png" } 
                    alt="Cyber Suraksha Logo" 
                    className="w-128 h-64 mb-8" 
                />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {eventDetails.title || 'Defend the Flag'}
                </h2>
                <p className="text-gray-600 text-center max-w-lg">
                    {eventDetails.description || 'Welcome to the Cyber Suraksha Platform! Our mission is to empower you with the skills and knowledge to protect and defend against cyber threats. Join us in our journey to a safer digital world.'}
                </p>
            </div>
            {/* Footer */}
            <footer className="text-center text-red-500 text-lg mt-16">
                Powered By Hacktify
            </footer>
        </div>
    );
};

export default Welcome;
