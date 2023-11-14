import { type Configuration } from 'webpack'
import { type IBuildOptions, type buildMode } from './types'
import { buildDevConfig } from './utils/buildDevConfig'
import { buildProdConfig } from './utils/buildProdConfig'

import { resolve } from 'path'

interface WebpackEnvProps {
  port?: number
  mode: buildMode
  WEBPACK_BUILD?: boolean
  WEBPACK_SERVE?: boolean
  apiUrl: string
}

const getApiUrl = (mode: buildMode, apiUrl?: string) => {
  if (apiUrl) {
    return apiUrl
  }
  if (mode === 'production') {
    return '/api'
  }

  return 'http://localhost:6001'
}

export default (env: WebpackEnvProps): Configuration => {
  const mode: buildMode =
    !!env.WEBPACK_BUILD && env.mode === 'production'
      ? 'production'
      : 'development'

  const apiUrl = getApiUrl(mode, env?.apiUrl)

  const options: IBuildOptions = {
    ...(env.port && { port: env.port }),
    paths: {
      entry: resolve(__dirname, '../..', 'src', 'index.tsx'),
      html: resolve(__dirname, '../..', 'public', 'index.html'),
      output: resolve(__dirname, '../..', 'dist'),
      src: resolve(__dirname, 'src')
    },
    mode,
    apiUrl
  }

  return mode === 'development'
    ? buildDevConfig(options)
    : buildProdConfig(options)
}
