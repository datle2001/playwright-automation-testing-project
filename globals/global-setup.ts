import { type FullConfig } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

export default async function globalSetup(config: FullConfig) {
  // prod, staging, dev, sit, uat, preprod
  setUpEnvironment();
}

const setUpEnvironment = () => {
  console.log("Setting up environment...");
  const env = process.env.ENV ? process.env.ENV.toLowerCase() : "prod";
  const envsFolder = path.join(__dirname, "../envs");
  const files = fs.readdirSync(envsFolder);
  const configFile = files.find((file) => file.toLowerCase() === `${env}.json`);

  if (configFile) {
    const filePath = path.join(envsFolder, configFile);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const config = JSON.parse(fileContent);

    process.env.BASE_URL = config.BASE_URL;
    process.env.ENV = env;
  } else {
    throw new Error(`No configuration file found for environment: ${env}`);
  }
};
