import { type Configuration } from 'webpack'

import { buildRules } from '../webpack.rules'
import { buildPlugins } from '../webpack.plugins'
import { buildDevServer } from '../webpack.devserver'
import { buildResolvers } from '../webpack.resolvers'
import { type IBuildOptions } from '../types'

export const buildDevConfig = (options: IBuildOptions): Configuration => {
  return {
    mode: 'development',
    entry: options.paths.entry,
    module: {
      rules: buildRules(options)
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[name].chunk.js'
    },
    plugins: buildPlugins(options),
    resolve: buildResolvers(),
    stats: 'errors-warnings',
    devServer: buildDevServer(options),
    devtool: 'inline-source-map'
  }
}
