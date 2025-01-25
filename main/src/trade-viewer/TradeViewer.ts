import GameMessage from "./GameMessage";
import type {Logger} from "../RemoteLogger";
import type {ServerEvents} from "../server";

const { Tail } = require('tail');

export default class TradeViewer {
  private tailedFile: typeof Tail;
  private logger: Logger;
  private server: ServerEvents;

  constructor(logger: Logger, server: ServerEvents) {
    this.logger = logger;
    this.server = server;
  }

  startListening() {
    if (this.tailedFile) {
      return;
    }

    this.tailedFile = new Tail("C:\\Program Files (x86)\\Steam\\steamapps\\common\\Path of Exile 2\\logs\\Client.txt", { nLines: 4000 })
    this.tailedFile.on("line", (line: string) => {
      const message = GameMessage.parse(line);
      if (message && message.isTrade) {
        this.server.sendEventTo("last-active", {
          name: "MAIN->CLIENT::trade-viewer",
          payload: message.tradeInfo!
        })
      }
    })
    this.tailedFile.on("error", (err: Error) => {
      this.logger.write("Unexpected error happened in chat messages parser: " + err.message)
    })
  }
}