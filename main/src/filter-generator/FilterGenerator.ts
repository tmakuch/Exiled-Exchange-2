import type {Logger} from "../RemoteLogger";
import type {ServerEvents} from "../server";
import { type IRawFilter } from "./data/IFilter";
import getFiltersContent from "./utils/builder";
import getFilters from "./data/filters";
import path from "node:path";
import fs from "node:fs";
import {GameConfig} from "../host-files/GameConfig";

export class FilterGenerator {
  private docsPath: string = "";
  private logger: Logger;
  private gameConfig: GameConfig;
  private server: ServerEvents;

  constructor(logger: Logger, gameConfig: GameConfig, server: ServerEvents) {
    this.logger = logger;
    this.gameConfig = gameConfig;
    this.server = server;

    this.server.onEventAnyClient("CLIENT->MAIN::user-action", (e) => {
      if (e.action === "filter-generate") {
        this.generateFilterFile(JSON.parse(e.text) as Array<IRawFilter>);
      }
    });
  }

  updateConfigPath() {
    const gameConfigFile = this.gameConfig.getConfigPath();
    if (!gameConfigFile) {
      this.logger.write("error [FilterGenerator] could not get config path");
      return;
    }
    this.docsPath = path.dirname(gameConfigFile);
  }

  generateFilterFile(customFilters: Array<IRawFilter>) {
    this.logger.write("info  [FilterGenerator] Received filter generation request");

    let filterFileContent: string;
    try {
      const filters = getFilters(customFilters);
      filterFileContent = getFiltersContent(filters);
    } catch (e) {
      const errMsg = (e as Error)?.message || e as string;
      this.logger.write(`error [FilterGenerator] Error generating filter file: ${errMsg}`);
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
      this.logger.write(`info  [FilterGenerator] Filter file was generated but there was problem to write to disk: ${errMsg}`);
      return;
    }

    this.logger.write("info  [FilterGenerator] Filter file was updated")
  }
}