<template>
  <div class="p-2">
    <p class="mb-4">
      This plugin lets you generate a item filter for the game. It modifies how items are displayed for you when they're on the ground.<br/>
      In addition to default modification, we've provided you an option to define your custom filters to hide selected items or make them more visible if you're looking for them.<br/>
      Read the docs what filters are available to you and head to editor tab.
      <br/><br/>
      Filter is based on one created by CYBERION, but was heavily modified. Go give him some love at<br/>
      <a href="https://www.pathofexile.com/forum/view-thread/3605018" target="_blank" class="bg-gray-900 px-1 rounded">https://www.pathofexile.com/forum/view-thread/3605018</a>
    </p>
    <h2 class="text-lg mb-4">Disclaimer regarding early-access</h2>
    <p class="mb-4">
      As of day of writing this PoE2 developers did not provide us PoE2 dedicated filter instructions. <br/>
      All working filters are based on PoE1 filter instructions. You can find them at <br/>
      <a href="https://www.pathofexile.com/item-filter/about" target="_blank" class="bg-gray-900 px-1 rounded">https://www.pathofexile.com/item-filter/about under Conditions section</a><br/>
      Go check full documentation to sell all potential identifiers, there's lots of them.
    </p>
    <h2 class="text-lg mb-4">Examples</h2>
    <div class="grid grid-cols-2 gap-1">
      <div class="col-span-2 p-1 border-2 border-gray-600">Filtering by class (for belts)</div>
      <div>Class</div>
      <div>Belts</div>
      <div class="col-span-2 p-1 border-2 border-gray-600">Filtering by class (for belts and Amulets)</div>
      <div>Class</div>
      <div>Belts,Amulets</div>
      <div class="col-span-2 p-1 border-2 border-gray-600">Filtering by name (for Stellar Amulet)</div>
      <div>BaseType</div>
      <div>Stellar Amulet</div>
      <div class="col-span-2 p-1 border-2 border-gray-600">Filtering by name (for Flasks)</div>
      <div>BaseType</div>
      <div>Life Flask,Mana Flask</div>
      <div class="col-span-2 p-1 border-2 border-gray-600">Filtering by amulets that dropped on map under level 50 (map level, not waystone tier)</div>
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
      entries: configModelValue(() => props.configWidget, "entries"),
      removeEntry(id: number) {
        console.log(props.configWidget.entries)
        props.configWidget.entries = props.configWidget.entries.filter(
          (_) => _.id !== id,
        );
      },
      addEntry() {
        console.log(...props.configWidget.entries.map((_) => _.id))
        props.configWidget.entries.push({
          id: Math.max(0, ...props.configWidget.entries.map((_) => _.id)) + 1,
          name: "",
          identifiers: [
            { key: "", value: ""}
          ],
          hide: false
        });
      },
      addIdentifier(entry: FilterGeneratorWidget["identifiers"][number]) {
        entry.identifiers.push({
          key: "",
          value: "",
        })
      },
      removeIdentifier(entry: FilterGeneratorWidget["identifiers"][number], identifierIdx: number) {
        entry.identifiers.splice(identifierIdx, 1)
      }
    };
  },
});
</script>

<style lang="postcss" module>
.identifiers {
  @apply grid;
  @apply gap-0.5;
  @apply col-start-2;
  grid-template-columns: 1fr 1fr auto;
}
</style>