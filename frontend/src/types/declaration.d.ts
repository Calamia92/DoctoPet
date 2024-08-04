declare module '*.jpg' {
    const value: string;
    export default value;
}
  
declare module '*.png' {
    const value: string;
    export default value;
}
  
declare module '*.jpeg' {
    const value: string;
    export default value;
}
  
declare module '*.gif' {
    const value: string;
    export default value;
}

// Define a custom type for Webpack's require.context
// declare function require(context: { context: Function }): {
//     keys: () => string[];
//     (id: string): any;
// };

// declare module NodeJS {
//     interface Require {
//         context: (path: string, recursive?: boolean, regExp?: RegExp) => any;
//     }
// }