<template>
  <div class="p-2">
    <p class="mb-4">
      {{ t("filter_generator.about_start1")}}<br/>
      {{ t("filter_generator.about_start2")}}<br/>
      {{ t("filter_generator.about_start3")}}
      <br/><br/>
      {{ t("filter_generator.about_start4")}}<br/>
      <a href="https://www.pathofexile.com/forum/view-thread/3605018" target="_blank" class="bg-gray-900 px-1 rounded">https://www.pathofexile.com/forum/view-thread/3605018</a>

    </p>
    <h2 class="text-lg mb-1">{{ t("filter_generator.about_disclaimer_header")}}</h2>
    <p class="mb-4">
      {{ t("filter_generator.about_disclaimer_text1")}}<br/>
      {{ t("filter_generator.about_disclaimer_text2")}}<br/>
      <a href="https://www.pathofexile.com/item-filter/about" target="_blank" class="bg-gray-900 px-1 rounded">https://www.pathofexile.com/item-filter/about {{ t("filter_generator.about_disclaimer_link_desc")}}</a><br/>
      {{ t("filter_generator.about_disclaimer_text3")}}
    </p>
    <h2 class="text-lg mb-1">{{ t("filter_generator.examples_header")}}</h2>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 p-1 border-2 border-gray-600">{{ t("filter_generator.examples_class")}}</div>
      <div>Class</div>
      <div>Belts</div>
      <div class="col-span-2 p-1 border-2 border-gray-600">{{ t("filter_generator.examples_class_multi")}}</div>
      <div>Class</div>
      <div>Belts,Amulets</div>
      <div class="col-span-2 p-1 border-2 border-gray-600">{{ t("filter_generator.examples_name")}}</div>
      <div>BaseType</div>
      <div>Stellar Amulet</div>
      <div class="col-span-2 p-1 border-2 border-gray-600">{{ t("filter_generator.examples_name_multi")}}</div>
      <div>BaseType</div>
      <div>Life Flask,Mana Flask</div>
      <div class="col-span-2 p-1 border-2 border-gray-600">{{ t("filter_generator.examples_complex")}}</div>
      <div>Class</div>
      <div>Belts</div>
      <div>AreaLevel</div>
      <div>&lt; 50</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import DndContainer from "vuedraggable";
import HotkeyInput from "../settings/HotkeyInput.vue";
import { configProp, configModelValue } from "../settings/utils.js";
import type { FilterGeneratorWidget } from "./widget.js";

export default defineComponent({
  name: "filter_generator.name",
  components: { DndContainer, HotkeyInput },
  props: configProp<FilterGeneratorWidget>(),
  setup(props) {
    const { t } = useI18n();

    return {
      t,
      title: configModelValue(() => props.configWidget, "wmTitle"),
    };
  },
});
</script>
