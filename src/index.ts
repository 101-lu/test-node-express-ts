import express from "express"
import { config } from "~/config"
import "~/type"
import kernel from "./app/start/kernel"
import logger from "./helpers/logger"

kernel(express()).listen(config.port, () => logger.info(`Server is running at http://${config.host}:${config.port}`))
