module.exports = {
  client: {
    includes: ["./src/**/*.tsx"],
    tagName: "gql",
    service: {
      name: "podcast-backend",
      url:
        process.env.NODE_ENV === "production"
          ? "https://prodgony-podcast-backend.herokuapp.com/graphql"
          : "http://localhost:4000/graphql",
    },
  },
};
