import { GoogleGenAI } from "@google/genai";

export const getLicenseComparison = async (planA: string, planB: string): Promise<string> => {
  let apiKey = process.env.API_KEY || '';
  
  // Basic sanitization: trim whitespace.
  // If the key was accidentally double-quoted in configuration (e.g. '"KEY"'), remove the quotes.
  apiKey = apiKey.trim();
  if (apiKey.startsWith('"') && apiKey.endsWith('"')) {
    apiKey = apiKey.substring(1, apiKey.length - 1);
  }
  if (apiKey.startsWith("'") && apiKey.endsWith("'")) {
    apiKey = apiKey.substring(1, apiKey.length - 1);
  }
  
  if (!apiKey) {
    return "API Key is missing. Please configure your environment variables.";
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Compare the Microsoft Licensing plans: "${planA}" and "${planB}".
    Act as a senior Microsoft Licensing Consultant (like a CSP or LSP expert).
    
    Highlight the key differences for an IT decision-maker.
    Focus specifically on:
    1. Security & Compliance (Intune, Defender, Entra ID/Azure AD differences).
    2. Exchange/Email limits (Mailbox size, Archiving).
    3. Desktop vs Web Apps rights.
    4. "Hidden" value (e.g., Virtualization rights, Windows OS entitlement).

    Keep the tone professional, objective, and concise. 
    Format with clear headings and bullet points using Markdown.
    Do not add any preamble. Jump straight to the analysis.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error: any) {
    console.error("Error fetching comparison:", error);
    if (error.message?.includes('API key not valid') || error.status === 'INVALID_ARGUMENT' || error.error?.code === 400) {
        return "Error: Invalid API Key. The server rejected the key provided. Please check your configuration.";
    }
    return `Failed to generate comparison. Error details: ${error.message || error}`;
  }
};

export const askLicenseAdvisor = async (question: string, context?: string): Promise<string> => {
  let apiKey = process.env.API_KEY || '';
  
  apiKey = apiKey.trim();
  if (apiKey.startsWith('"') && apiKey.endsWith('"')) {
    apiKey = apiKey.substring(1, apiKey.length - 1);
  }
  if (apiKey.startsWith("'") && apiKey.endsWith("'")) {
    apiKey = apiKey.substring(1, apiKey.length - 1);
  }

  if (!apiKey) {
    return "API Key is missing.";
  }

  const ai = new GoogleGenAI({ apiKey });

  const contextPrompt = context ? `Context: User is comparing ${context}.` : '';
  
  const prompt = `
    You are an expert Microsoft Licensing Consultant.
    User Question: "${question}"
    ${contextPrompt}
    
    Provide a clear, cost-aware answer. 
    If the question is about mixing plans (e.g., Business vs Enterprise), explain the technical and licensing constraints (e.g., 300 seat limit, Group Policy issues).
    Mention "NCE" (New Commerce Experience) commitments if relevant to cancellation/terms.
    
    Disclaimer: Always end with a very brief standard disclaimer that this is not official Microsoft legal advice.
    Format the response in Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error: any) {
    console.error("Error asking advisor:", error);
    if (error.message?.includes('API key not valid') || error.status === 'INVALID_ARGUMENT' || error.error?.code === 400) {
        return "Error: Invalid API Key. The server rejected the key provided.";
    }
    return `Sorry, I couldn't process your request. Error: ${error.message || error}`;
  }
};