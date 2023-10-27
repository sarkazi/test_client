import { type RuleSetRule } from 'webpack'
import { loader } from 'mini-css-extract-plugin'
import { type IBuildOptions } from './types'

export const buildRules = (options: IBuildOptions): RuleSetRule[] => {
  return [
    // ts
    {
      test: /\.tsx?$/,
      exclude: /(node_modules|\.webpack)/,
      use: {
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    },
    // css/scss
    {
      test: /\.s[ac]ss$/i,
      use: [
        { loader: options.mode === 'development' ? 'style-loader' : loader },
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName:
                options.mode === 'development'
                  ? '[path][name]__[local]--[hash:base64:4]'
                  : '[hash:base64:8]',
              auto: (resPath: string) => !!resPath.includes('.module.scss')
            }
          }
        },
        { loader: 'sass-loader' }
      ]
    },

    // svg
    {
      test: /\.svg$/,
      use: ['@svgr/webpack']
    },
    // jpg, png, gif, jpeg
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader'
        }
      ]
    }
  ]
}
