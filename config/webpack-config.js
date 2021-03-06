/* ==========================================================================
   Settings for webpack JavaScript bundling system.
   ========================================================================== */

const BROWSER_LIST = require( './browser-list-config' );
const webpack = require( 'webpack' );
const UglifyWebpackPlugin = require( 'uglifyjs-webpack-plugin' );

/* Commmon webpack 'module' option used in each configuration.
   Runs code through Babel and uses global supported browser list. */
const COMMON_MODULE_CONFIG = {
  rules: [ {
    use: {
      loader: 'babel-loader?cacheDirectory=true',
      options: {
        presets: [ [ '@babel/preset-env', {
          targets: {
            browsers: BROWSER_LIST.LAST_2_PLUS_IE_9_AND_UP
          },
          debug: false
        } ] ]
      }
    }
  } ]
};

/* Set warnings to true to show linter-style warnings.
   Set mangle to false and beautify to true to debug the output code. */
const COMMON_UGLIFY_CONFIG = new UglifyWebpackPlugin( {
  cache: true,
  parallel: true,
  uglifyOptions: {
    ie8: false,
    ecma: 5,
    warnings: true,
    mangle: true,
    output: {
      comments: false,
      beautify: false
    }
  }
} );

const commonConf = {
  cache: true,
  module: COMMON_MODULE_CONFIG,
  mode: 'production',
  plugins: [
    COMMON_UGLIFY_CONFIG
  ]
};

module.exports = { commonConf };
