import HtmlWebpackPlugin from 'html-webpack-plugin'
import { type IBuildOptions } from './types'
import {
  type WebpackPluginInstance,
  ProgressPlugin,
  DefinePlugin,
  HotModuleReplacementPlugin
} from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

export const buildPlugins = (
  options: IBuildOptions
): WebpackPluginInstance[] => {
  return [
    new HtmlWebpackPlugin({
      template: options.paths.html,
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].chunk.css'
    }),
    new ProgressPlugin(),
    new DefinePlugin({
      __IS_DEV__: options.mode === 'development'
    }),
    ...(options.mode === 'development'
      ? [new HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()]
      : []),
    new BundleAnalyzerPlugin({
      openAnalyzer: false
    })
  ]
}
