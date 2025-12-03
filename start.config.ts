import { defineConfig } from '@tanstack/react-start/config'

export default defineConfig({
  appDirectory: 'app',
  routesDirectory: 'app/routes',
  routeConfig: {
    routeFilePrefix: '',
    routeFileIgnorePrefix: '-',
  },
})
