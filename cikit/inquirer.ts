/*
 * @Desc: 
 * @Author: hankin.dream
 * @Date: 2022-08-29 15:22:14
 */

import inquirer from "inquirer";
import { execSync } from "child_process";

export const inquireVersion = async () => {
  const { version } = await inquirer.prompt({
    type: "list",
    name: "version",
    message: "Please select the release version from list",
    default: "patch",
    choices: ["major", "minor", "patch", "next", "pre-release", "as-is", "custom"],
  });
  return version;
};

export const updateVersion = async() => {
  await execSync("bumpp --commit \"release: release v%s\"", { stdio: "inherit" });
  const {version} =  await import('../package.json')
  return version
}
