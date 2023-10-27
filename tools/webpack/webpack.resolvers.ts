import { type ResolveOptions } from 'webpack'

export const buildResolvers = (): ResolveOptions => {
  return {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css']
  }
}
