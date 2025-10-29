
import React from 'react';

interface BrandStatementProps {
  statement: string;
}

const BrandStatement: React.FC<BrandStatementProps> = ({ statement }) => {
  return (
    <div className="text-center p-6 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 rounded-lg border border-gray-700">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-cyan-300 mb-2">Brand Statement</h3>
      <p className="text-2xl md:text-3xl font-semibold italic text-gray-100">
        “{statement}”
      </p>
    </div>
  );
};

export default BrandStatement;
