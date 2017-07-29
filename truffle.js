module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    AWS: {
      host: "54.65.92.97",
      port: 5566,
      network_id: 55661
    }
  }
};
