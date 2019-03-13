import Config from '../src/Config'

export default {
  "short_name": Config.appName,
  "name": `nferX ${Config.appName}`,
  "start_url": Config.homepage,
  "display": "minimal-ui",
  "theme_color": Config.primaryColor,
  "background_color": Config.primaryColor,
}
