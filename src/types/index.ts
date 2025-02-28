export interface Model {
  id: string;
  creator?: {
    name: string;
    avatar?: string;
  };
  image: string;
  name: string;
  categories: string[];
  description: string;
  updatedAt: string;
  downloads: string;
  likes: string;
}

export interface NavItemType {
  id: string;
  label: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}