<template>
  <Widget :config="config" :commands="commands" move-handles="corners" readonly :inline-edit="false">
    <div
      class="widget-default-style p-1 flex flex-col overflow-y-auto min-h-0 min-w-32"
      style="min-width: 5rem"
    >
      <div class="text-gray-100 p-1 flex items-center justify-between gap-4">
        <span class="truncate">{{ config.wmTitle || "Untitled" }}</span>
      </div>
      <div class="flex flex-col gap-y-1 overflow-y-auto min-h-0">
        <span class="p-2" v-if="!commands.some(c => c.showInWidget)">{{ t("chat_messages.empty") }}</span>
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

const { t } = useI18n();

const props = defineProps<{
  config: ChatMessagesWidget;
  commands: Array<Config["commands"][number]>,
}>();

const wm = inject<WidgetManager>("wm")!;

props.config.wmTitle = t("chat_messages.name");

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
