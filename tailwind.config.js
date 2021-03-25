module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  theme: {
    gradientColorStops: (theme) => ({
      ...theme("colors"),
      podGradStart: "#ff8800",
      podGradEnd: "#ff3300",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      podOrange: "#FF5500",
    }),
    backgroundColor: (theme) => ({
      ...theme("colors"),
      podOrange: "#FF5500",
    }),
  },
};
