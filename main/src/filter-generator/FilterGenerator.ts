import type {Logger} from "../RemoteLogger";
import type {ServerEvents} from "../server";
import getDocumentsFolderPath from "./utils/getDocumentsFolderPath";
import { type IRawFilter } from "./data/IFilter";
import getFiltersContent from "./utils/builder";
import getFilters from "./data/filters";
import path from "node:path";
import fs from "node:fs";

export class FilterGenerator {
  private docsPath: string;
  private logger: Logger;
  private server: ServerEvents;

  public static async register(logger: Logger, server: ServerEvents) {
    const docsPath = await getDocumentsFolderPath()
    return new FilterGenerator(docsPath, logger, server);
  }

  private constructor(docsPath:string, logger: Logger,server: ServerEvents) {
    this.docsPath = docsPath;
    this.logger = logger;
    this.server = server;

    this.server.onEventAnyClient("CLIENT->MAIN::user-action", (e) => {
      if (e.action === "filter-generate") {
        this.generateFilterFile(JSON.parse(e.text) as Array<IRawFilter>);
      }
    });
  }

  generateFilterFile(customFilters: Array<IRawFilter>) {
    this.logger.write("Received filter");

    let filterFileContent: string;
    try {
      const filters = getFilters(customFilters);
      filterFileContent = getFiltersContent(filters);
    } catch (e) {
      const errMsg = (e as Error)?.message || e as string;
      this.logger.write(`Error generating filter file: ${errMsg}`);
      return;
    }

    try {
      const poe2Folder = path.join(this.docsPath, "My Games/Path of Exile 2");
      const filterPath = path.join(poe2Folder, "exiled_exchange_2_filter.filter");
      const filterFolderPath = path.join(poe2Folder, "exiled_exchange_2_filter_data");

      fs.writeFileSync(filterPath, filterFileContent);
      fs.mkdirSync(filterFolderPath, { recursive: true });
    } catch (e) {
      const errMsg = (e as Error)?.message || e as string;
      this.logger.write(`Filter file was generated but there was problem to write to disk: ${errMsg}`);
      return;
    }

    this.logger.write("Filter file was updated")
  }
}