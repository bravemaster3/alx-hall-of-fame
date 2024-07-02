// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   darkMode: 'class', // or 'media' or 'class'
//   theme: {
//     extend: {
//       colors: {
//         white: "#fff",
//         gainsboro: "#e4e4e7",
//         black: "#000",
//         gray: {
//           "100": "#fafafa",
//           "200": "#18181b",
//           "300": "#0f172a",
//           "400": "#09090b",
//         },
//         steelblue: "#3194b4",
//         dimgray: "#71717a",
//         darkgray: "#b2b2b2",
//       },
//       spacing: {},
//       fontFamily: {
//         inter: "Inter",
//       },
//       borderRadius: {
//         "3xs": "10px",
//       },
//     },
//     fontSize: {
//       base: "16px",
//       sm: "14px",
//       "3xs": "10px",
//       xs: "12px",
//       "5xl": "24px",
//       lgi: "19px",
//       inherit: "inherit",
//     },
//     screens: {
//       mq1125: {
//         raw: "screen and (max-width: 1125px)",
//       },
//       mq750: {
//         raw: "screen and (max-width: 750px)",
//       },
//       mq450: {
//         raw: "screen and (max-width: 450px)",
//       },
//     },
//   },
//   corePlugins: {
//     preflight: false,
//   },
//   plugins: [],
// }



// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   darkMode: 'class', // or 'media' or 'class'
//   theme: {
//     extend: {
//       colors: {
//         // Light mode colors
//         white: {
//           light: "#fff",
//           dark: "#1a202c",
//         },
//         gainsboro: {
//           light: "#e4e4e7",
//           dark: "#2d3748",
//         },
//         black: {
//           light: "#000",
//           dark: "#e2e8f0",
//         },
//         gray: {
//           "100": "#fafafa",
//           "200": "#18181b",
//           "300": "#0f172a",
//           "400": "#09090b",
//         },
//         steelblue: {
//           light: "#3194b4",
//           dark: "#63b3ed",
//         },
//         dimgray: {
//           light: "#71717a",
//           dark:  "#a0aec0",
//         },
//         darkgray: {
//           light: "#b2b2b2",
//           dark: "#e2e8f0",
//         },
//         // Dark mode colors
//         // dark: {
//         //   white: "#1a202c",
//         //   gainsboro: "#2d3748",
//         //   black: "#e2e8f0",
//         //   gray: {
//         //     "100": "#2d3748",
//         //     "200": "#4a5568",
//         //     "300": "#718096",
//         //     "400": "#a0aec0",
//         //   },
//         //   steelblue: "#63b3ed",
//         //   dimgray: "#a0aec0",
//         //   darkgray: "#e2e8f0",
//         // },
//       },
//       spacing: {},
//       fontFamily: {
//         inter: "Inter",
//       },
//       borderRadius: {
//         "3xs": "10px",
//       },
//     },
//     fontSize: {
//       base: "16px",
//       sm: "14px",
//       "3xs": "10px",
//       xs: "12px",
//       "5xl": "24px",
//       lgi: "19px",
//       inherit: "inherit",
//     },
//     screens: {
//       mq1125: {
//         raw: "screen and (max-width: 1125px)",
//       },
//       mq750: {
//         raw: "screen and (max-width: 750px)",
//       },
//       mq450: {
//         raw: "screen and (max-width: 450px)",
//       },
//     },
//   },
//   corePlugins: {
//     preflight: false,
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Light mode colors
        white: "#fff",
        gainsboro: "#e4e4e7",
        black: "#000",
        gray: {
          "100": "#fafafa",
          "200": "#18181b",
          "300": "#0f172a",
          "400": "#09090b",
        },
        steelblue: "#3194B4",
        dimgray: "#71717a",
        darkgray: "#b2b2b2",
        // Dark mode colors
        'dark-white': "#0F172A",
        'dark-gainsboro': "#90959f",
        'dark-black': "#e2e8f0",
        'dark-gray-100': "#2d3748",
        'dark-gray-200': "#4a5568",
        'dark-gray-300': "#718096",
        'dark-gray-400': "#a0aec0",
        'dark-steelblue': "#1976D2",
        'dark-dimgray': "#a0aec0",
        'dark-darkgray': "#e2e8f0",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
      },
      borderRadius: {
        "3xs": "10px",
      },
    },
    fontSize: {
      base: "16px",
      sm: "14px",
      "3xs": "10px",
      xs: "12px",
      "5xl": "24px",
      lgi: "19px",
      inherit: "inherit",
    },
    screens: {
      mq1125: {
        raw: "screen and (max-width: 1125px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded', 'dark'], // Enable variants for scrollbar
  },
}
