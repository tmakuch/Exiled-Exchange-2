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
          class="rounded p-2 leading-4 text-gray-100 border-b-gray-800 border-b-2 last:border-b-0"
        >
          <div>{{ trade.item }} ({{ trade.price }})</div>
          <div>Tab: {{ trade.stashName }} ({{ trade.stashLocation }})</div>
          <div v-for="buyer in trade.buyers" class="flex flex-row gap-1 items-center mt-1">
            <div class="flex-grow">{{ buyer }}</div>

            <button class="flex-grow-0 rounded p-1 text-gray-100 bg-gray-800"><i class="fas fa-paper-plane text-gray-400 w-4 h-4" /></button>
            <button class="flex-grow-0 rounded p-1 text-gray-100 bg-gray-800"><i class="fas fa-map-marker-alt text-gray-400 w-4 h-4" /></button>
            <button class="flex-grow-0 rounded p-1 text-gray-100 bg-gray-800"><i class="fas fa-user-plus text-gray-400 w-4 h-4" /></button>
            <button class="flex-grow-0 rounded p-1 text-gray-100 bg-gray-800"><i class="fas fa-thumbs-up text-gray-400 w-4 h-4" /></button>
            <button class="flex-grow-0 rounded p-1 text-gray-100 bg-gray-800"><i class="fas fa-times text-gray-400 w-4 h-4" /></button>
          </div>
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
const activeTrades: Array<TradeRequest> = ref([
    {
      id: "server-test-0-from-ego",
      item: "Astramentalis Stellar Amulet",
      price: "1 div",
      league: "hardcore",
      stashName: "sale",
      stashLocation: "top 1, left 1",
      buyers: [
        "ego-2513",
        "ego-1514",
        "ego-101c",
        "ego-a8e with a very long name to test it",
        "ego-1e18"
      ]
    },
    {
      id: "server-test-1-from-ego",
      item: "Ingenuity, Utility Belt",
      price: "1 div",
      league: "hardcore",
      stashName: "sale",
      stashLocation: "top 1, left 1",
      buyers: [
        "ego-26bd",
        // "ego-1c51"
      ]
    }
]);

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

MainProcess.onEvent("MAIN->CLIENT::trade-viewer", (entry: TradeViewerRawEntry) => {
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

