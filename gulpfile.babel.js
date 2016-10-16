import path from 'path'
import gulp from 'gulp'
import gutil from 'gulp-util'
import WebpackDevServer from "webpack-dev-server"
import webpack from "webpack"
import del from 'del'
import env from 'gulp-env'
import gulpSequence from 'gulp-sequence'
import nodemon from 'gulp-nodemon'
import open from 'open'

const DEV_PORT = 3000
gulp.task('serve', cb =>{
  let webpackConfig = require('./webpack.config')
  let myConfig = Object.create(webpackConfig)
  myConfig.entry.unshift('webpack/hot/only-dev-server')
  myConfig.entry.unshift('webpack-dev-server/client?http://localhost:' + DEV_PORT)
  new WebpackDevServer(webpack(myConfig), {
      contentBase: "./src",
      noInfo: false,
      hot: true,
      inline: true,
      historyApiFallback: true,
      publicPath: myConfig.output.publicPath,
      stats: {
        colors: true
      }
  }).listen(DEV_PORT, "localhost", err => {
      if(err) throw new gutil.PluginError("webpack-dev-server", err)
      gutil.log("[webpack-dev-server]", "==> 🌎  http://localhost:" + DEV_PORT)
      open('http://localhost:' + DEV_PORT)
  });
})


gulp.task('webpack', cb => {
  let webpackConfig = require('./webpack.config')
  let myConfig = Object.create(webpackConfig)
  webpack(myConfig, function(err, stats) {
      if(err) throw new gutil.PluginError("webpack", err)
      gutil.log("[webpack]", stats.toString({
          // output options
      }))
      cb()
  })
})

gulp.task('nodemon', ()=> {
  nodemon({
    script: path.join(__dirname, '/server.js'),
    ext: 'js',
    watch: [
      path.join(__dirname, '/dist')
    ],
    env: { 'NODE_ENV': 'production','PORT':PROD_PORT }
  })
})
