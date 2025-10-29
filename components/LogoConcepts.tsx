import React, { useState } from 'react';
import { LogoConcept } from '../types';
import { generateLogoImage } from '../services/geminiService';

interface LogoConceptsProps {
  concepts: LogoConcept[];
}

interface ImageData {
  url: string | null;
  isLoading: boolean;
  error: string | null;
}

const PenIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L15.232 5.232z" />
    </svg>
);

const LogoConcepts: React.FC<LogoConceptsProps> = ({ concepts }) => {
  const [images, setImages] = useState<Record<number, ImageData>>({});

  const handleGenerateImage = async (index: number, description: string) => {
    setImages(prev => ({
      ...prev,
      [index]: { url: null, isLoading: true, error: null }
    }));

    try {
      const base64Image = await generateLogoImage(description);
      const imageUrl = `data:image/png;base64,${base64Image}`;
      setImages(prev => ({
        ...prev,
        [index]: { url: imageUrl, isLoading: false, error: null }
      }));
    } catch (e) {
      console.error(e);
      setImages(prev => ({
        ...prev,
        [index]: { url: null, isLoading: false, error: 'Failed to generate image.' }
      }));
    }
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-purple-300">Logo Concepts</h3>
      <ul className="space-y-4">
        {concepts.map((concept, index) => {
          const imageData = images[index];
          return (
            <li key={index} className="p-4 bg-gray-700/50 rounded-md transition-all">
              <div className="flex items-start mb-3">
                <PenIcon />
                <p className="text-gray-300">{concept.description}</p>
              </div>
              <div className="mt-3">
                {imageData?.url && (
                  <div className="mt-2 mb-2 flex justify-center bg-gray-900/50 p-2 rounded-md">
                    <img src={imageData.url} alt={`Generated logo for ${concept.description}`} className="rounded-md max-w-full h-auto max-h-48" />
                  </div>
                )}
                {imageData?.isLoading && (
                  <div className="flex items-center justify-center p-2 text-sm text-cyan-300">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Visualizing...
                  </div>
                )}
                {imageData?.error && (
                   <p className="text-sm text-red-400 text-center py-2">{imageData.error}</p>
                )}
                {!imageData?.isLoading && !imageData?.url && (
                  <div className="text-right">
                    <button
                      onClick={() => handleGenerateImage(index, concept.description)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Visualize Logo
                    </button>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LogoConcepts;
