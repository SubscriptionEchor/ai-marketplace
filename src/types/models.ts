export interface Model {
  id: string;
  type?: 'model' | 'dataset' | 'infra';
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
  status?: 'active' | 'pending' | 'inactive';
  metrics?: {
    accuracy: string;
    precision: string;
    recall: string;
    f1Score: string;
  };
  pricing?: {
    model: string;
    price: string;
    currency: string;
  };
}

export interface Dataset extends Model {
  format: string;
  size: string;
  license: string;
  metadata?: {
    rows: string;
    columns: string;
    schema: string;
  };
}

export interface InfraProvider extends Model {
  region: string;
  specs: {
    cpu: string;
    memory: string;
    storage: string;
    gpu: string;
  };
  terms?: {
    usage: string[];
    custom?: string;
  };
}