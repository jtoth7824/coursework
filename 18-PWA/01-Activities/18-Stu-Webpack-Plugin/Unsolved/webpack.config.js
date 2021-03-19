const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
  // Update the entry point
  entry: "/public/assets/js/app.js",
  output: {
    // Set the path and filename for the output bundle (hint: You will need to use "__dirname")
    path: __dirname + "/public/dist/",
    filename: "bundle.js"
  },
  mode: "production",
  plugins: [new WebpackPwaManifest({
          // the name of the generated manifest file
          filename: "manifest.json",

          // we aren't using webpack to generate our html so we
          // set inject to false
          inject: false,
    
          // set fingerprints to `false` to make the names of the generated
          // files predictable making it easier to refer to them in our code
          fingerprints: false,
    
          name: "Images App",
          short_name: "Images App",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          start_url: "/",
          display: "standalone",

    icons: [
      {
        src: path.resolve(__dirname, 'public/assets/images/icons/icon-512x512.png'),
        sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      },
//      {
//        src: path.resolve('public/assets/images/icons/large-icon.png'),
//        size: '1024x1024' // you can also use the specifications pattern
//      },
//      {
//        src: path.resolve('public/assets/images/icons/maskable-icon.png'),
//        size: '1024x1024',
//        purpose: 'maskable'
//      }
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    start_url: "/",
    display: "standalone"
  }
  )]
};

module.exports = config;
