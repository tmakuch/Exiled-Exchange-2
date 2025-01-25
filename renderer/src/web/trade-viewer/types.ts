export interface TradeRequest {
  id: string;
  item: string;
  price: string;
  league: string;
  stashName: string;
  stashLocation: string;
  buyers: string[];
}

export interface TradeViewerRawEntry {
  from: string;
  item: string;
  price: string;
  league: string;
  stashName: string;
  stashLocation: string;
  itemId: string;
}