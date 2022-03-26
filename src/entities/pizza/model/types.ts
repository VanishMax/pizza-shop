export interface Pizza {
  _id: string;
  title: string;
  description: string;
  photo: string;
  price: {
    usd: number;
    eur: number;
  };
}
