import { Sharp } from "sharp"
import { ImageOptions } from './types'


function toFileType(icon: Sharp, options: ImageOptions, fileType: 'webp' | 'png'): Sharp {
  if (fileType === 'webp') {
    return icon.webp({
      quality: options.output?.webp?.quality || 80,
      alphaQuality: 100,
      lossless: options.output?.webp?.lossless || false,
      nearLossless: options.output?.webp?.nearLossless || false,
      smartSubsample: options.output?.webp?.smartSubsample || false,
      force: true
    })
  }
  return icon.png({
    quality: options.output?.png?.quality || 100,
    compressionLevel: options.output?.png?.compressionLevel || 6,
    force: true
  })
}

export async function generateIcon(
  iconInstance: Sharp,
  options: ImageOptions,
  format: 'webp' | 'png',
  purpose: 'maskable' | 'any',
  resolution: number): Promise<Buffer> {

  const icon = iconInstance.clone()

  if (purpose === 'any')
    icon.resize(resolution, resolution, { fit: 'contain', background: 'rgba(0,0,0,0)' })

  if (purpose === 'maskable') {
    const paddingPx = Math.ceil(resolution * ((options.maskablePaddingPercent || 10) / 100))
    icon.resize(resolution - (2 * paddingPx),
      resolution - (2 * paddingPx),
      { fit: 'contain', background: 'rgba(0,0,0,0)' })

    icon.extend({
      top: paddingPx,
      left: paddingPx,
      bottom: paddingPx,
      right: paddingPx,
      background: 'rgba(0,0,0,0)'
    })
  }

  return toFileType(
    icon,
    options,
    format
  ).toBuffer()
}
