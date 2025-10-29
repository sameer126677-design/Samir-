import { GoogleGenAI, Type } from "@google/genai";
import { BrandIdentity } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const brandIdentitySchema = {
  type: Type.OBJECT,
  properties: {
    logoConcepts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          description: {
            type: Type.STRING,
            description: "A concise, descriptive concept for a logo that can be used as a prompt for an image generator.",
          },
        },
        required: ["description"],
      },
      description: "A list of 3-4 distinct logo concepts.",
    },
    colorPalette: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          hex: {
            type: Type.STRING,
            description: "A valid 6-digit hex color code starting with #, e.g., #FFFFFF.",
          },
          name: {
            type: Type.STRING,
            description: "A descriptive name for the color, e.g., 'Midnight Blue'.",
          },
        },
        required: ["hex", "name"],
      },
      description: "An array of 5 complementary colors for the brand palette.",
    },
    typography: {
      type: Type.OBJECT,
      properties: {
        headlineFont: {
          type: Type.STRING,
          description: "A suggested font for headlines, e.g., 'Montserrat'.",
        },
        bodyFont: {
          type: Type.STRING,
          description: "A suggested font for body text, e.g., 'Lato'.",
        },
      },
      required: ["headlineFont", "bodyFont"],
      description: "Font pairings for headlines and body content.",
    },
    brandStatement: {
      type: Type.STRING,
      description: "A short, impactful brand mission statement or slogan.",
    },
  },
  required: ["logoConcepts", "colorPalette", "typography", "brandStatement"],
};


export const generateBrandIdentity = async (companyName: string, keywords: string): Promise<BrandIdentity> => {
  const prompt = `You are a world-class branding expert. A user is looking for a brand identity for their company/idea. 
Based on the provided name "${companyName}" and keywords "${keywords}", generate a complete brand identity.
The identity must include logo concepts, a 5-color palette, typography suggestions, and a brand mission statement.
Respond ONLY with a valid JSON object that strictly adheres to the provided schema. Do not include any markdown formatting like \`\`\`json.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: brandIdentitySchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedData: BrandIdentity = JSON.parse(jsonText);
    return parsedData;

  } catch (error) {
    console.error("Error generating brand identity:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
};

export const generateLogoImage = async (description: string): Promise<string> => {
  const prompt = `A modern, minimalist, vector-style logo concept. The logo should represent: "${description}". Clean, solid white background.`;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return base64ImageBytes;
    } else {
      throw new Error("No image was generated.");
    }
  } catch (error) {
    console.error("Error generating logo image:", error);
    throw new Error("Failed to generate logo image from the AI model.");
  }
};
