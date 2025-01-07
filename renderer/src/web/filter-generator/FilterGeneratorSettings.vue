<template>
  <div class="p-2">
    <p>Which filter to update:</p>
    <select v-model="selectedFilterFile" class="p-1 rounded bg-gray-700 col-start-2">
      <option v-for="file in files" :key="file" :value="file">{{ file }}</option>
    </select>
    <p>Additional filter will be put between dedicated comments. If filter file does not have those comments, put extra rules at:</p>
    <select v-model="filterStrategy" class="p-1 rounded bg-gray-700 col-start-2">
      <option value="before">the beginning of the file</option>
      <option value="after">the end of the file</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { configProp, configModelValue } from "../settings/utils.js";
import type { FilterGeneratorWidget } from "./widget.js";
import {Host, MainProcess} from "@/web/background/IPC";

export default defineComponent({
  name: "filter_generator.settings",
  props: configProp<FilterGeneratorWidget>(),
  setup(props) {
    const { t } = useI18n();
    const files = ref([]);

    Host.onEvent("MAIN->CLIENT::filter-generator:list", (event: { folder: string, files: string[] }) => {
      files.value = event.files;
    });

    onMounted(() => {
      MainProcess.sendEvent({
        name: "CLIENT->MAIN::user-action",
        payload: {
          action: "filter-generator:list",
        },
      });
    });

    return {
      t,
      title: configModelValue(() => props.configWidget, "wmTitle"),
      selectedFilterFile: configModelValue(() => props.configWidget, "selectedFilterFile"),
      filterStrategy: configModelValue(() => props.configWidget, "filterStrategy"),
      files,
    };
  },
});
</script>

<style lang="postcss" module>
</style>