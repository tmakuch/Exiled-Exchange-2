import type { Logger } from "../RemoteLogger";
import type { ServerEvents } from "../server";
import { type IRawFilter } from "./data/IFilter";
import getFiltersContent from "./utils/builder";
import getFilters from "./utils/parseRawFilters";
import path from "node:path";
import fs from "node:fs/promises";
import { GameConfig } from "../host-files/GameConfig";

export class FilterGenerator {
  private get docsPath() {
    return path.dirname(this.gameConfig.actualPath ?? "");
  }
  private logger: Logger;
  private gameConfig: GameConfig;
  private server: ServerEvents;

  constructor(logger: Logger, gameConfig: GameConfig, server: ServerEvents) {
    this.logger = logger;
    this.gameConfig = gameConfig;
    this.server = server;

    this.server.onEventAnyClient("CLIENT->MAIN::user-action", (e) => {
      switch (e.action) {
        case "filter-generator:update": {
          this.updateFilterFile(JSON.parse(e.text) as { file: string, strategy: 'before' | 'after',  rules: Array<IRawFilter> });
          return;
        }
        case "filter-generator:list": {
          this.sendListOfFilters();
          return;
        }
      }
    });
  }

  async updateFilterFile(event: { file: string, strategy: 'before' | 'after', rules: Array<IRawFilter> }) {
    if (this.docsPath === "") {
      this.logger.write(
        "error [FilterGenerator] Invalid game config path, could not generate filter file."
      );
      return;
    }

    this.logger.write(
      "info  [FilterGenerator] Received filter generation request"
    );

    if (!path.isAbsolute(event.file)) {
      event.file = path.join(this.docsPath, event.file);
    }

    let oldFilterFileContent;
    let newFilterFileContent;

    try {
      oldFilterFileContent = await fs.readFile(event.file, 'utf-8');
    } catch (e) {
      const errMsg = (e as Error)?.message || e as string;
      this.logger.write(`error [FilterGenerator] Could not read selected file: ${errMsg}`);
      return;
    }

    try {
      const customFilters = getFilters(event.rules);
      newFilterFileContent = getFiltersContent(event.strategy, oldFilterFileContent, customFilters);
    } catch (e) {
      const errMsg = (e as Error)?.message || (e as string);
      this.logger.write(
        `error [FilterGenerator] Error generating filter file: ${errMsg}`
      );
      return;
    }

    try {
      await fs.writeFile(event.file, newFilterFileContent);
    } catch (e) {
      const errMsg = (e as Error)?.message || (e as string);
      this.logger.write(
        `error  [FilterGenerator] Filter file was generated but there was problem to write to disk: ${errMsg}`
      );
      return;
    }

    this.logger.write("info  [FilterGenerator] Filter file was updated");
  }

  async sendListOfFilters() {
    const listOfFilters = (await fs.readdir(this.docsPath)).filter((fileName: string) => fileName.endsWith('.filter'));
    this.server.sendEventTo('last-active', {
      name: "MAIN->CLIENT::filter-generator:list",
      payload: {
        folder: this.docsPath,
        files: listOfFilters,
      }
    });
  }
}
