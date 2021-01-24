export interface IPrice {
  code: string;
  description: string;
  rate: string;
  rate_float: number;
  symbol: string;
}

export interface IPrices {
  [key: string]: IPrice;
}

export type LoadingStatus = "fulfilled" | "rejected" | "pending";

export interface ICurrencies {
  prices: IPrices;
  updated: Date;
  status: LoadingStatus;
}

export interface IAnalysis {
  data: {
    unique_tags?: string[];
    most_used_tag?: string;
    longest_path?: string;
  };
  status: LoadingStatus;
}

export interface IStore {
  currencies: ICurrencies;
  analysis: IAnalysis;
}
