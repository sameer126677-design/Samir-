
import React from 'react';

const Welcome: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center text-gray-400 h-full p-8">
            <div className="mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2V7a2 2 0 00-2-2H5zM5 14a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2H5z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to the Brand Identity Generator</h2>
            <p className="max-w-md">
                Enter your company name or a brief idea and some optional keywords into the form on the left.
                Click "Generate Identity" to bring your brand to life with AI.
            </p>
        </div>
    );
};

export default Welcome;
