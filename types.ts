export interface Color {
  hex: string;
  name: string;
}

export interface Typography {
  headlineFont: string;
  bodyFont: string;
}

export interface LogoConcept {
  description: string;
}

export interface BrandIdentity {
  logoConcepts: LogoConcept[];
  colorPalette: Color[];
  typography: Typography;
  brandStatement: string;
}
