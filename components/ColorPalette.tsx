
import React, { useState } from 'react';
import { Color } from '../types';

interface ColorPaletteProps {
  colors: Color[];
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ colors }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-purple-300">Color Palette</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {colors.map((color, index) => (
          <div key={index} className="text-center">
            <div
              className="h-20 w-full rounded-md cursor-pointer border-2 border-transparent hover:border-white transition-all duration-200 relative group"
              style={{ backgroundColor: color.hex }}
              onClick={() => handleCopy(color.hex)}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xs font-mono">{copiedHex === color.hex ? 'Copied!' : 'Copy'}</span>
              </div>
            </div>
            <p className="mt-2 text-sm font-medium text-gray-300">{color.name}</p>
            <p className="text-xs text-gray-400 font-mono">{color.hex}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
