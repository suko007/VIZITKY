
export interface CardData {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  template: 'modern' | 'minimalist' | 'classic' | 'sidebar';
}

export interface SuggestionResponse {
  motto: string;
  description: string;
}
