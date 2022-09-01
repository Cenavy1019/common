/*
 * @Desc: 
 * @Author: hankin.dream
 * @Date: 2022-08-29 15:22:14
 */
import { execSync } from "child_process";
import chalk from "chalk";
import { updateVersion } from "./inquirer";

async function initRelease() {
  execSync("jest --coverage --watch", { stdio: "inherit" });
  console.log(chalk.blueBright("所有测试用例通过!"));
  
  const version = await updateVersion();
  console.log('version: ', version);

  execSync(`standard-version --release-as ${version}`, { stdio: "inherit" });
  console.log(chalk.blueBright("版本更新完成!"));

  execSync("npm publish --access public", { stdio: "inherit" });
  console.log(chalk.blueBright("NPM发布完成!"));
  
  execSync("git push origin main", { stdio: "inherit" });
  execSync("git push origin --tags", { stdio: "inherit" });
  console.log(chalk.blueBright("代码提交到远程仓库中!"));
}

initRelease();
