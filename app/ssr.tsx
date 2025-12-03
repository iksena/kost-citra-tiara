/// <reference types="vinxi/types/server" />
import { getRouterManifest } from '@tanstack/react-start/server'
import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server'
import { getRouter } from './router'

const StartHandler = createStartHandler({
  createRouter: getRouter,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  getRouterManifest,
})(defaultStreamHandler)

export default StartHandler
