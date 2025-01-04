import { type IFilter, type IRawFilter} from "../data/IFilter";
import { RGBA } from "../data/vars";

const customFilterModifiers = {
  SetTextColor: RGBA.WHITE(150),
  SetBackgroundColor: RGBA.EXALT(150),
  SetBorderColor: RGBA.EXALT(),
};

export default function parseRawFilters(rawFilters: Array<IRawFilter>): Array<IFilter> {
  return rawFilters.filter((filter: IRawFilter) => {
    const identifiersCount = filter.identifiers.filter((identifier: IRawFilter['identifiers'][number]) => {
      return identifier.key.length > 0 && identifier.value.length > 0;
    }).length;

    //filter out empty raw filters (with no specified or not full identifiers)
    return identifiersCount > 0;
  }).map((filter: IRawFilter) => ({
      name: filter.name,
      identifiers: filter.identifiers.reduce((result, next: {key: string, value: string }) => {
        //filter empty or not full identifiers
        if (next.key.length > 0 && next.value.length > 0) {
          result[next.key] = next.value.includes(',') ? next.value.split(",") : next.value;
        }
        return result;
      }, {} as Record<string, string | Array<string>>),
      hide: filter.hide,
      modifiers: !filter.hide ? customFilterModifiers : undefined,
    }));
}