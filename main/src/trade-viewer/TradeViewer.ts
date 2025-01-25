const { Tail } = require('tail');

export default class TradeViewer {
  private tailedFile: typeof Tail;
  constructor() {
    this.tailedFile = new Tail("C:\\Program Files (x86)\\Steam\\steamapps\\common\\Path of Exile 2\\logs\\Client.txt")
    this.tailedFile.on("line", (line: string) => {
      console.log("game:" + line);
    })
    this.tailedFile.on("error", (err: Error) => {
      console.error("game:" + err.message);
    })
  }
}