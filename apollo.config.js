module.exports = {
  client: {
    includes: ["./src/**/*.tsx"],
    tagName: "gql",
    service: {
      name: "podcast-backend",
      url: "https://devgony-podcast-backend.herokuapp.com/graphql",
    },
  },
};
