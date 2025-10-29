
import React from 'react';
import { BrandIdentity } from '../types';
import LogoConcepts from './LogoConcepts';
import ColorPalette from './ColorPalette';
import TypographyDisplay from './TypographyDisplay';
import BrandStatement from './BrandStatement';

interface BrandIdentityDisplayProps {
  brandIdentity: BrandIdentity;
}

const BrandIdentityDisplay: React.FC<BrandIdentityDisplayProps> = ({ brandIdentity }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <BrandStatement statement={brandIdentity.brandStatement} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <LogoConcepts concepts={brandIdentity.logoConcepts} />
        <TypographyDisplay typography={brandIdentity.typography} />
      </div>
      <ColorPalette colors={brandIdentity.colorPalette} />
    </div>
  );
};

export default BrandIdentityDisplay;
