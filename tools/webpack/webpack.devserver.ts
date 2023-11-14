import webpackDevServer, { type Configuration } from 'webpack-dev-server'
import { type IBuildOptions } from './types'

export const buildDevServer = (options: IBuildOptions): Configuration => {
  return {
    open: true,
    port: options.port,
    historyApiFallback: true,
    hot: true,
    liveReload: false
  }
}
