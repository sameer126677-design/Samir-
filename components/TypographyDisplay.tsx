
import React from 'react';
import { Typography } from '../types';

interface TypographyDisplayProps {
  typography: Typography;
}

const TypographyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v18M4.5 12.5h15" />
    </svg>
);


const TypographyDisplay: React.FC<TypographyDisplayProps> = ({ typography }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-purple-300">Typography</h3>
      <div className="space-y-4">
        <div className="p-3 bg-gray-700/50 rounded-md">
          <p className="text-sm text-gray-400 mb-1">Headline Font</p>
          <p className="text-2xl font-bold text-gray-200" style={{ fontFamily: `"${typography.headlineFont}", sans-serif` }}>{typography.headlineFont}</p>
        </div>
        <div className="p-3 bg-gray-700/50 rounded-md">
          <p className="text-sm text-gray-400 mb-1">Body Font</p>
          <p className="text-md text-gray-200" style={{ fontFamily: `"${typography.bodyFont}", sans-serif` }}>{typography.bodyFont}</p>
        </div>
      </div>
    </div>
  );
};

export default TypographyDisplay;
