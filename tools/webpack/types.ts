export type buildMode = 'development' | 'production'

export interface IBuildPaths {
  entry: string
  output: string
  html: string
}

export interface IBuildOptions {
  paths: IBuildPaths
  port?: number
  mode: buildMode
}
