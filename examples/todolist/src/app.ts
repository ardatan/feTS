import { App } from "uWebSockets.js";
import { router } from "./router";

export const app = App().any('/*', router);
