import { type IFilter, type IRawFilter} from "../data/IFilter";
import { RGBA } from "../data/vars";

const customFilterModifiers = {
  SetTextColor: RGBA.WHITE(150),
  SetBackgroundColor: RGBA.EXALT(150),
  SetBorderColor: RGBA.EXALT(),
};

export default function parseRawFilters(rawFilters: Array<IRawFilter>): Array<IFilter> {
  return rawFilters.map((filter: IRawFilter) => ({
      name: filter.name,
      identifiers: filter.identifiers.reduce((result, next: {key: string, value: string }) => {
        result[next.key] = next.value.includes(',') ? next.value.split(",") : next.value;
        return result;
      }, {} as Record<string, string | Array<string>>),
      hide: filter.hide,
      modifiers: !filter.hide ? customFilterModifiers : undefined,
    }));
}