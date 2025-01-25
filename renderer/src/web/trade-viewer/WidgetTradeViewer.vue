<template>
  <Widget :config="config" move-handles="corners" :inline-edit="false">
    <div
      class="widget-default-style p-1 flex flex-col overflow-y-auto min-h-0 w-72"
      style="min-width: 5rem"
    >
      <div class="text-gray-100 p-1 flex items-center justify-between gap-4">
        <span class="truncate">{{ config.wmTitle || "Untitled" }}</span>
      </div>
      <div class="flex flex-col gap-y-1 overflow-y-auto min-h-0">
        <div
          v-for="trade in activeTrades"
          :key="trade.id"
        >
          <span>{{ trade.item }}</span>
          for
          <span>{{ trade.price }}</span>
          from
          <span v-if="trade.buyers.length === 1">{{ trade.buyers[0] }}</span>
          <span v-if="trade.buyers.length > 1">multiple people: {{ trade.buyers.join(', ') }}</span>
        </div>
      </div>
    </div>
  </Widget>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import { useI18n } from "vue-i18n";
import { MainProcess } from "@/web/background/IPC";
import type { WidgetManager } from "../overlay/interfaces.js";
import type { TradeViewerWidget } from "./widget.js";
import Widget from "../overlay/Widget.vue";
import type { TradeRequest, TradeViewerRawEntry} from "@/web/trade-viewer/types";

const props = defineProps<{
  config: TradeViewerWidget;
}>();

const wm = inject<WidgetManager>("wm")!;
const { t } = useI18n();
const activeTrades: Array<TradeRequest> = ref([]);

if (props.config.wmFlags[0] === "uninitialized") {
  props.config.wmFlags = ["invisible-on-blur"];
  props.config.anchor = {
    pos: "tl",
    x: Math.random() * (40 - 20) + 20,
    y: Math.random() * (40 - 20) + 20,
  };
  props.config.entries = [];
  wm.show(props.config.wmId);
}

props.activeTrades = {};

MainProcess.onEvent("MAIN->CLIENT::trade-viewer", (entry: TradeViewerRawEntry) => {
  console.log(entry);
  const existingTrade = activeTrades.value.find(trade => trade.id === entry.itemId);

  if (existingTrade) {
    existingTrade.buyers = [...new Set([...existingTrade.buyers, entry.from])]
  } else {
    activeTrades.value.push({
      id: entry.itemId,
      item: entry.item,
      price: entry.price,
      league: entry.league,
      stashName: entry.stashName,
      stashLocation: entry.stashLocation,
      buyers: [
        entry.from
      ],
    });
  }
})
</script>

