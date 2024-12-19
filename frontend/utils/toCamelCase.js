export const toCamelCase = (str) => {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
};

// export default function toCamelCase(str) {
//     const camelize = str
//       .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
//       .replace(/^\w/, (c) => c.toLowerCase());
//     console.camelize;
//     return camelize;
//   }
