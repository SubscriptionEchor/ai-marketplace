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

export interface Dataset extends Model {
  format: string;
  size: string;
  license: string;
}

export interface InfraProvider extends Model {
  type: string;
  region: string;
  specs: {
    cpu: string;
    memory: string;
    storage: string;
    gpu: string;
  };
}