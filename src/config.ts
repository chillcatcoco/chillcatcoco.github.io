export const IS_DEV = process.env.NODE_ENV === 'development'

export const SITE_DOMAIN = IS_DEV ? 'localhost' : 'chillcatcoco.github.io'
export const SITE_BASE_URL = IS_DEV
  ? 'http://localhost:3000'
  : 'https://chillcatcoco.github.io'
export const SITE_SHORT_NAME = 'ChillCatCoCo'
export const SITE_AUTHOR_NAME = 'ChillCatCoCo'
export const SITE_AUTHOR_EMAIL = 'chillcatcoco@gmail.com'
export const SITE_AUTHOR_AVATAR_URL = 'https://github.com/chillcatcoco.png'
export const SITE_AUTHOR_URL = 'https://github.com/chillcatcoco'

export const SITE_TITLE = 'ChillCatCoCo Blog'
export const SITE_DESCRIPTION =
  "Welcome to ChillCatCoCo Blog. Let's learn together."

// export const SHOW_SHARE_TO_X = false
// export const SHOW_SHARE_TO_BLUESKY = false
// export const GITHUT_USERNAME = 'chillcatcoco'
// export const GITHUT_REPO_SLUG = 'chilcatcoco.github.io' // optional to show "Edit on GiutHub" link
