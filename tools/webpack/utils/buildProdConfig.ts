import { type Configuration } from 'webpack'
import { buildRules } from '../webpack.rules'
import { buildPlugins } from '../webpack.plugins'
import { buildResolvers } from '../webpack.resolvers'
import { type IBuildOptions } from '../types'

export const buildProdConfig = (options: IBuildOptions): Configuration => {
  return {
    mode: 'production',
    entry: options.paths.entry,
    module: {
      rules: buildRules(options)
    },
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].chunk.js',
      clean: true
    },
    plugins: buildPlugins(options),
    resolve: buildResolvers(),
    stats: 'errors-warnings',
    optimization: {
      minimize: true,
      sideEffects: true,
      concatenateModules: true,
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 10,
        minSize: 0,
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all'
          }
        }
      }
    }
  }
}
