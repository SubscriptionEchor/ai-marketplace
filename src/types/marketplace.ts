export interface MarketplaceItem {
  id: number;
  title: string;
  creator: string;
  description: string;
  price: {
    eth: number;
    usd: number;
  };
}