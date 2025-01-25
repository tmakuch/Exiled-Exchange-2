interface TradeInfo {
  from: string;
  item: string;
  price: string;
  league: string;
  stashName: string;
  stashLocation: string;
  itemId: string;
}

export default class GameMessage {
  private static rawMessageRegex = /(\S+ \S+) \w+ \w+ \[.*?] (.*)/g;
  private static tradeRegex = /@From (\S+): Hi, I would like to buy your (.*?) listed for (.*?) in (\S+) \(stash tab "(.*?)"; position: (.*?)\)/g;

  readonly timestamp: Date;
  readonly text: string;
  readonly isTrade: boolean;
  readonly tradeInfo?: TradeInfo;

  private constructor(date: string, message: string) {
    this.timestamp = new Date(date);
    this.text = message;

    const tradeMatch = GameMessage.tradeRegex.exec(message);

    this.isTrade = !!tradeMatch;

    if (tradeMatch) {
       this.tradeInfo = {
         from: tradeMatch[1],
         item: tradeMatch[2],
         price: tradeMatch[3],
         league: tradeMatch[4],
         stashName: tradeMatch[5],
         stashLocation: tradeMatch[6],
         itemId: [
           tradeMatch[2].toLowerCase(),
           tradeMatch[5].toLowerCase(),
           tradeMatch[6].toLowerCase(),
         ].map(el => el.replaceAll(/[\s,]+/g, '-')).join('-'),
       }
    }
  }

  public static parse(line: string): GameMessage | null {
    const match = this.rawMessageRegex.exec(line);

    if (!match) {
      return null;
    }

    return new GameMessage(match[1], match[2]);
  }
}