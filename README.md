# Welcome to Jinder

A web app for personalized swiping and liking.

## Release Notes

01-2019: You can now upload your own profile image!
12-2017: First release of Jinder onto the world!

## Credits

*   This app's functionality was heavily inpired by the JTinder Jquery plugin. Check it out at https://github.com/do-web/jTinder 
*   The image resizing cloud function is taken from https://angularfirebase.com/lessons/image-thumbnail-resizer-cloud-function/ 

## Technology used

*   React
*   Firebase for authentication, storage and DB
*   Jest + Enzyme for testing

## Deployment

Deployed using Netlify. See the netlify.toml file for configuration.

## Dev Notes

*   Can analyze bundle-size using WebpackBundleAnalyzer by building using the webpack.dev config (e.g. by running npm-start). For more info, see [this hackernoon post](https://hackernoon.com/optimising-your-application-bundle-size-with-webpack-e85b00bab579).

### NPM Package Notes

#### /functions (i.e. google cloud functions)
*   @google-cloud/storage: Node SDK for Google Cloud Storage
*   fs-extra: mirrors the existing node filesystem methods, but uses Promises, allow the use async/await
*   sharp: An easy to use Promise-based package for the image resizing operations that is about 4x faster than the built-in ImageMagick