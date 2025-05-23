const Arena = require("bull-arena");
const Bull = require("bull");
const arena = Arena(
  {
    Bull,
    queues: [
      {
        name: "arena-queue",
        hostId: "Local Redis Instance. ",
        type: "bull",
        redis: { host: "127.0.0.1", port: 6379 },
      },
    ],
  },
  {
    basePath: "/arena",
    disableListen: true,
  }
);

module.exports = arena;
