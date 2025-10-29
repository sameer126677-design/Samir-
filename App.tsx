
import React, { useState } from 'react';
import { BrandIdentity } from './types';
import { generateBrandIdentity } from './services/geminiService';
import Header from './components/Header';
import BrandInputForm from './components/BrandInputForm';
import BrandIdentityDisplay from './components/BrandIdentityDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Welcome from './components/Welcome';

const App: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [keywords, setKeywords] = useState('');
  const [brandIdentity, setBrandIdentity] = useState<BrandIdentity | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!companyName.trim()) {
      setError('Please enter a company name or idea.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setBrandIdentity(null);

    try {
      const result = await generateBrandIdentity(companyName, keywords);
      setBrandIdentity(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate brand identity. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <BrandInputForm
              companyName={companyName}
              setCompanyName={setCompanyName}
              keywords={keywords}
              setKeywords={setKeywords}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 min-h-[60vh] flex flex-col justify-center">
              {isLoading && <LoadingSpinner />}
              {error && <ErrorMessage message={error} />}
              {!isLoading && !error && brandIdentity && <BrandIdentityDisplay brandIdentity={brandIdentity} />}
              {!isLoading && !error && !brandIdentity && <Welcome />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
