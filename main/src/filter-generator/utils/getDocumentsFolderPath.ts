import os from "node:os";

const Winreg = require("winreg");

export default function getDocumentsFolderPath(): Promise<string> {
  return new Promise((resolve, reject) => {
    const regKey = new Winreg({
      hive: Winreg.HKCU,
      key: "\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\User Shell Folders",
    });

    regKey.values(function (err: Error, items: Array<{ name: string; value: string}>) {
      if (err) {
        return reject(err);
      }

      const docFolder = items.find((i) => i.name === "Personal");

      if (!docFolder) {
        return reject(null);
      }

      return resolve(docFolder.value.replace("%USERPROFILE%", os.homedir()));
    });
  });
};
