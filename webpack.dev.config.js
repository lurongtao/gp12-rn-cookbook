const createExpoWebpackConfigAsync = require('@expo/webpack-config')
const path = require('path')

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)

  // resovle
  // config.resolve.alias = {
  //   assets: path.resolve(__dirname, './assets')
  // }
  config.resolve.alias['assets'] = path.resolve(__dirname, './assets')

  return config
}