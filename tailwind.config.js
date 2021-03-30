const podOrange = "#FF5500";
module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: { display: ["hover", "group-hover"], borderColor: ["hover"] },
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
      podOrange,
    }),
    backgroundColor: (theme) => ({
      ...theme("colors"),
      podOrange,
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      podOrange,
    }),
  },
};
