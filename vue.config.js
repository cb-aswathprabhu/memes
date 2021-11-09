module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      title: 'Memes',
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.s(c|a)ss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              // Requires >= sass-loader@^8.0.0
              options: {
                implementation: require('sass'),
                sassOptions: {
                  indentedSyntax: true // optional
                },
              },
            },
          ],
        },
      ],
    }
  }
}