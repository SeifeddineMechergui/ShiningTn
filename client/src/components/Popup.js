import React from 'react';
import { useNavigate } from 'react-router-dom';

const Popup = ({ onClose }) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        // Replace '/your-target-link' with the actual link you want to navigate to
        navigate('ing-dashboard.vercel.app');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded shadow">
                <h2 className="text-lg font-bold">Shining</h2>
                <p>You wanna be a seller?</p>
                <div className="flex justify-between">
                    <button onClick={handleRedirect} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                        Yes
                    </button>
                    <button onClick={onClose} className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
