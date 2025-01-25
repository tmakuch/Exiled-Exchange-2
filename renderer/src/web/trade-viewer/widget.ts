import type { Widget, Anchor } from "../overlay/widgets.js";

export interface TradeViewerWidget extends Widget {
  anchor: Anchor;
  gameFolderLocation: string;
}