// // src/utils/imageLoader.ts

// // Define a function to import all images
// const importAll = (requireContext: __WebpackModuleApi.RequireContext) => {
//     let images: { [key: string]: string } = {};
//     requireContext.keys().forEach((item: string) => {
//       images[item.replace('./', '')] = requireContext(item).default;
//     });
//     return images;
//   };
  
//   // Use Webpack's require.context to dynamically import all images from SliderPics
//   const images = importAll(require.context('../assets/SliderPics', false, /\.(png|jpe?g|svg)$/));
  
//   export default images;
  