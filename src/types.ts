export interface IconsMember {
  src: string
  sizes: string
  type?: string
  purpose?: string
}
interface ProtocolHandlersMember {
  protocol: string
  url: string
}
interface RelatedApplicationsMember {
  platform: string
  url: string
  id?: string
}
interface ScreenshotsMember {
  src: string
  sizes?: string
  type?: string
  label?: string
  platform?: string
}
interface ShortcutsMember {
  name: string
  short_name?: string
  description?: string
  url: string
  icons?: IconsMember[]
}
type CategoriesMember = 'beauty'
  | 'books'
  | 'books & reference'
  | 'business'
  | 'cars'
  | 'dating'
  | 'design'
  | 'developer'
  | 'developer tools'
  | 'development'
  | 'education'
  | 'entertainment'
  | 'events'
  | 'fashion'
  | 'finance'
  | 'fitness'
  | 'food'
  | 'fundraising'
  | 'games'
  | 'government'
  | 'graphics'
  | 'graphics & design'
  | 'health'
  | 'health & fitness'
  | 'kids'
  | 'lifestyle'
  | 'magazines'
  | 'medical'
  | 'multimedia'
  | 'multimedia design'
  | 'music'
  | 'navigation'
  | 'network'
  | 'networking'
  | 'news'
  | 'parenting'
  | 'personalization'
  | 'pets'
  | 'photo'
  | 'photo & video'
  | 'politics'
  | 'productivity'
  | 'reference'
  | 'security'
  | 'shopping'
  | 'social'
  | 'social networking'
  | 'sports'
  | 'transportation'
  | 'travel'
  | 'utilities'
  | 'video'
  | 'weather'

type OrientationMember = 'any'
  | 'natural'
  | 'landscape'
  | 'landscape - primary'
  | 'landscape - secondary'
  | 'portrait'
  | 'portrait - primary'
  | 'portrait - secondary'

/**
  ## ManifestOptions

  Options for your manifest. They are all optional and carry over to the final manifest unmodified.

  All properties are properly typed and can be viewed using IntelliSense.

  ### Recommended Properties

  `name`: The name of the app. Falls back to the name in `package.json`.

  `short_name`: A shorter version of `name`. (Used for the homescreen, etc.)

  `description`: The description of the app.

  `display`: The display mode of the app.

  `start_url`: The URL to go to when opening the app.

  `background_color`: The background color of the splash screen.

  `theme_color`: The theme color of the app.

  `categories`: The categories of the app. (eg. `'beauty', 'magazines'`)

  ### Other Properties

  `display_override`: What display modes to consider (in order, overrides `display`).

  `scope`: The scope of the app. (What part of the website this app covers).

  `orientation`: The orientation of the app.

  `screenshots`: Screenshots of the app. (For appstores that support this).

  `shortcuts`: Shortcuts for the app. (Currently mostly mobile).

  `iarc_rating_id`: The International Age Rating Coalition ID of the app.

  `related_applications`: Related applications for the app.

  `prefer_related_applications`: Whether to prefer related applications.

  `protocol_handlers`: Protocol handlers for the app.

  `lang`: The language of the app.

  `dir`: The text direction of the app.

  ### Undocumented / Experimental

  `note_taking`: Configuration options for note-taking apps. (undocumented)

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`new_note_url`: Presumably the URL to create a new note.

  `id`: The ID of the app. In future chrome and possibly other devices will use this to associate an app with a website's manifest. (Currently behind a feature flag in Canary)

*/
interface ManifestOptions {
  background_color?: string
  categories?: CategoriesMember[]
  description?: string
  dir?: 'ltr' | 'rtl'
  display?: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser'
  display_override?: ('fullscreen' | 'standalone' | 'minimal-ui' | 'browser' | 'window-controls-overlay')[]
  iarc_rating_id?: string
  lang?: string
  name?: string
  note_taking?: { new_note_url?: string } // no docs
  orientation?: OrientationMember
  prefer_related_applications?: boolean
  protocol_handlers?: ProtocolHandlersMember[]
  related_applications?: RelatedApplicationsMember[]
  scope?: string
  screenshots?: ScreenshotsMember[]
  short_name?: string
  shortcuts?: ShortcutsMember[]
  start_url?: string
  theme_color?: string
  id?: string
}

/**
  ## ImageOptions

  Options for the automatic image generation. All keys are optional.

  `src`: The source image to generate different sizes and formats from.

  `maskablePaddingPercent`: The percentage of padding to add.

  `resolutions`: An array of resolutions to generate.

  `output`: Options for the output.

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`png`: Options for the png output.

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`quality`: The quality of the png. Default is 100.

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`compressionLevel`: The compression level of the png. Default is 6.

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`webp`: Options for the webp output.

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`quality`: The quality of the webp. Default is 80.

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`lossless`: Whether to use lossless compression. Default is false.

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`nearLossless`: Use near lossless compression. Default is false.

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`smartSubsample`: Whether to use smart subsampling. Default is false.
 */
export interface ImageOptions {
  src?: string
  maskablePaddingPercent?: number
  resolutions?: number[]
  output?: {
    png?: {
      quality?: number
      compressionLevel?: number
    }
    webp?: {
      quality?: number
      lossless?: boolean
      nearLossless?: boolean
      smartSubsample?: boolean
    }
  }
}

/**
  ## PluginOptions

  The options for the plugin.

  `image`: The options for the image generation.

  `manifest`: The options for the manifest.
 */
export interface PluginOptions {
  image?: ImageOptions
  manifest?: ManifestOptions
}
