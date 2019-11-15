'use strict'
const path = require('path')

module.exports = {
  projectRoot: path.resolve(__dirname, 'example'),
  watchFolders: [__dirname],

  resolver: {
    extraNodeModules: {
      '@vovkasm/react-native-image-picker': __dirname,
    },
    useWatchman: false,
  },
}
