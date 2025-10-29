
import React from 'react';

interface BrandInputFormProps {
  companyName: string;
  setCompanyName: (value: string) => void;
  keywords: string;
  setKeywords: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const BrandInputForm: React.FC<BrandInputFormProps> = ({
  companyName,
  setCompanyName,
  keywords,
  setKeywords,
  onSubmit,
  isLoading,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      onSubmit();
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl sticky top-24">
      <h2 className="text-xl font-semibold mb-4 text-cyan-300">Brand Details</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-1">
            Company Name or Idea *
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., Quantum Coffee"
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-300 mb-1">
            Keywords (Optional)
          </label>
          <input
            type="text"
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., modern, minimalist, tech"
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
            disabled={isLoading}
          />
        </div>
        <button
          onClick={onSubmit}
          disabled={isLoading || !companyName.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold py-3 px-4 rounded-md hover:from-purple-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-400 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Identity'
          )}
        </button>
      </div>
    </div>
  );
};

export default BrandInputForm;
