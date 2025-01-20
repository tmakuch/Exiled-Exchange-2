import type { Widget, Anchor } from "../overlay/widgets.js";

export interface ChatMessagesWidget extends Widget {
  anchor: Anchor;
}
