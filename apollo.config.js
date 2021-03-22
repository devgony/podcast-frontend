module.exports = {
  client: {
    includes: ["./src/**/*.tsx"],
    tagName: "gql",
    service: {
      name: "podcast-backend",
      url: "http://localhost:4000/graphql",
    },
  },
};
