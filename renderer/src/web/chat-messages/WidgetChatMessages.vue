<template>
  <Widget :config="config" :commands="commands" move-handles="corners" :inline-edit="false">
    <div
      class="widget-default-style p-1 flex flex-col overflow-y-auto min-h-0 w-72"
      style="min-width: 5rem"
    >
      <div class="text-gray-100 p-1 flex items-center justify-between gap-4">
        <span class="truncate">{{ config.wmTitle || "Untitled" }}</span>
      </div>
      <div class="flex flex-col gap-y-1 overflow-y-auto min-h-0">
        <span v-if="!commands.some(c => c.friendlyName)">There's no commands to show</span>
        <button v-for="command in commands.filter(c => c.friendlyName)" :class="$style.btn">
          {{ command.friendlyName || command.text }}
        </button>
      </div>
    </div>
  </Widget>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { useI18n } from "vue-i18n";
import { MainProcess } from "@/web/background/IPC";
import type { WidgetManager } from "../overlay/interfaces.js";
import type { ChatMessagesWidget } from "./widget.js";

import Widget from "../overlay/Widget.vue";

const props = defineProps<{
  config: ChatMessagesWidget;
  commands: Array<{
    text: "string";
    friendlyName: string;
    send: boolean;
  }>
}>();

const wm = inject<WidgetManager>("wm")!;

if (props.config.wmFlags[0] === "uninitialized") {
  props.config.wmFlags = ["invisible-on-blur"];
  props.config.anchor = {
    pos: "tl",
    x: 10,
    y: Math.random() * (40 - 30) + 30,
  };
  props.config.entries = [];
  wm.show(props.config.wmId);
}

function regenerateFilter() {
  MainProcess.sendEvent({
    name: "CLIENT->MAIN::user-action",
    payload: {
      action: "filter-generator:update",
      text: JSON.stringify({
        folder: props.config.filtersFolder,
        file: props.config.selectedFilterFile,
        strategy: props.config.filterStrategy,
        rules: props.config.entries,
      }),
    },
  });
}

const { t } = useI18n();
</script>

<style lang="postcss" module>
.btn {
  @apply rounded;
  @apply max-w-sm;
  @apply p-2 leading-4;
  @apply text-gray-100 bg-gray-800;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    @apply bg-gray-700;
  }
}
</style>
