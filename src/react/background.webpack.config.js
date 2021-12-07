const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/chromeServices/background.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            "noEmit": false
          }
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'background.js',
    path: path.resolve(__dirname, 'build/background'),
  },
};
