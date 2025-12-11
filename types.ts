export interface LicensePlan {
  id: string;
  name: string;
  shortName: string;
  description: string;
  price: string; // approximate pricing text
  category: 'Business' | 'Enterprise' | 'Frontline';
  popular: boolean;
  apps: string[];       // e.g. "Desktop Apps", "Web Apps"
  services: string[];   // e.g. "Exchange (50GB)", "Teams"
  security: string[];   // e.g. "Intune", "Defender"
  features: string[];   // e.g. "300 User Limit", "Shared Computer Activation"
}

export interface AiResponseState {
  loading: boolean;
  content: string | null;
  error: string | null;
}
