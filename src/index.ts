import { Plugin } from 'vite'
import { PluginOptions } from './types.js'
import { readFileSync, existsSync } from 'fs'
import { generateIcon } from './utils.js';
import sharp from 'sharp'


export default (options: PluginOptions): Plugin => {
  const purposes: ('any' | 'maskable')[] = ['maskable', 'any']
  const formats: ('webp' | 'png')[] = ['webp', 'png']

  let manifestUrl: string = ''

  return {
    name: 'vite-plugin-webmanifest',
    async buildStart() {
      const imageSrc = options.image?.src || './icon.png'

      if (!existsSync(imageSrc))
        this.error(`The currently specified image source '${imageSrc}' (relative to the root of the project) doesn't exist. (Hint: You can specify it's location in the plugin's options under \`image.src\`)`)

      const icon = sharp(readFileSync(imageSrc))

      if (!(await icon.metadata()).hasAlpha)
        this.warn('The image you have selected has no alpha channel (no transparency layer). This will result in some botched-looking splashscreens and generally ugly icon presentations. Consider adding an alpha channel to your image.')

      let icons: object[] = []

      for (const resolution of (options.image?.resolutions || [180, 192, 270, 512])) {
        for (const purpose of purposes) {
          for (const format of formats) {
            icons.push({
              src: this.getFileName(this.emitFile({
                type: 'asset',
                fileName: `assets/pwa/icon-${resolution}-${purpose}.${format}`,
                source: await generateIcon(icon, options.image || {}, format, purpose, resolution)
              })),
              sizes: `${resolution}x${resolution}`,
              type: `image/${format}`,
              purpose: purpose
            })
          }
        }
      }

      const packageInfo = existsSync('package.json') ? JSON.parse(readFileSync('package.json').toString()) : undefined

      if (!(packageInfo?.name || options.manifest?.name))
        this.warn('No name specified in package.json or plugin options. Please specify a name in `manifest.name`.')

      const manifest = {
        name: packageInfo?.name || '<name>',
        description: packageInfo?.description || '<description>',
        start_url: '/',
        display: 'standalone',
        ...options.manifest || {},
        icons
      };


      manifestUrl = this.getFileName(
        this.emitFile({
          type: 'asset',
          fileName: 'manifest.webmanifest',
          source: Buffer.from(JSON.stringify(manifest))
        })
      )
      // TODO: emit all the apple splash screens
      // TODO: cache the generated images to avoid work on every build
      // TODO: currently the manifest is only injected to index.html
    },
    async transformIndexHtml() {
      return [
        {
          tag: 'link',
          attrs: {
            rel: 'manifest',
            href: manifestUrl
          },
          injectTo: 'head'
        }
      ]
    }
  }
}
