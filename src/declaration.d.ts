declare module '*.scss'
declare module '*.css'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'

declare const __IS_DEV__: boolean

declare module '*.svg' {
  import type React from 'react'
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}
