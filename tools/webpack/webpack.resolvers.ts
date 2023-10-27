import { type ResolveOptions } from 'webpack'
import { type IBuildOptions } from './types'

export const buildResolvers = (options: IBuildOptions): ResolveOptions => {
  return {
    extensions: ['.tsx', '.ts', '.js']
    // preferAbsolute: true,
    // modules: [options.paths.src, 'node_modules'],
    // mainFiles: ['index'],
    // alias: {
    //   '@': options.paths.src
    // }
  }
}
