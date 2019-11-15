const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProduction = process.env.NODE_ENV !== 'development'; // either production or server

const MODES = {
  development: 'development',
  production: 'production',
};

module.exports = (env, argv) => ({
  mode: MODES[argv.mode],
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js'],
    modules: ['node_modules', 'src'],
  },
  devServer: {
    hot: true,
    port: 8082,
    overlay: true,
  },
  devtool: !isProduction && 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        oneOf: [
          {
            test: /styles\.s?css$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',

                options: {
                  modules: {
                    localIdentName: '[local]--[hash:base64:5]',
                  },
                  importLoaders: 2,
                },
              },
              'postcss-loader',
              'sass-loader',
            ],
          },
          {
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
          },
        ],
      },
    ],
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.ico',
    }),
    new MiniCssExtractPlugin({ filename: '[name]-[contenthash:8].css' }),
    ...(!isProduction ? [new BundleAnalyzerPlugin({ analyzerPort: 7001, openAnalyzer: false })] : []),
  ],
});
