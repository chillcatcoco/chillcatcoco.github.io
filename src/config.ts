export const IS_DEV = process.env.NODE_ENV === 'development'

// config site
export const SITE_DOMAIN = process.env.SITE_DOMAIN || 'chillcat.pages.dev'
export const SITE_BASE_URL = IS_DEV
  ? 'http://localhost:3000'
  : `https://${SITE_DOMAIN}`
export const SITE_SHORT_NAME = 'ChillCatCoCo'
export const SITE_TITLE = 'ChillCatCoCo Blog'
export const SITE_DESCRIPTION =
  "Welcome to ChillCatCoCo Blog. Let's learn together."

// config author
export const SITE_AUTHOR_NAME = 'ChillCatCoCo'
export const SITE_AUTHOR_EMAIL = 'chillcatcoco@gmail.com'
export const SITE_AUTHOR_URL = 'https://github.com/chillcatcoco'
export const SITE_AUTHOR_AVATAR_URL = 'https://github.com/chillcatcoco.png'
