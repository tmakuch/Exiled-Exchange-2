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
        <span v-if="!commands.some(c => c.showInWidget)">No commands are selected to show in widget</span>
        <button v-for="command in commands.filter(c => c.showInWidget)" :class="$style.btn" @click="sendChatEvent(command)">
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
import type { Config } from "../Config"

import Widget from "../overlay/Widget.vue";

const props = defineProps<{
  config: ChatMessagesWidget;
  commands: Array<Config["commands"][number]>,
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

function sendChatEvent(command: Config["commands"][number]) {
  MainProcess.sendEvent({
    name: "CLIENT->MAIN::user-action",
    payload: {
      action: "paste-in-chat",
      text: command.text,
      send: command.send,
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
