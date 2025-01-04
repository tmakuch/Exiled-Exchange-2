import type { Widget, Anchor } from "../overlay/widgets.js";

export interface FilterGeneratorWidget extends Widget {
  anchor: Anchor;
  entries: Array<{
    id: number;
    name: string;
    identifiers: Array<{
      key: string;
      value: string;
    }>,
    hide: boolean;
  }>;
}
