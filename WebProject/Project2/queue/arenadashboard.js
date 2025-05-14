const Arena = require('arena');

const arena = Arena({
  queues: [
    {
      name: "arena-queue",
      hostId: "Queue Server",
      type: "bull",
      redis: { host: "127.0.0.1", port: 6379 },
    },
  ],
}, {
  basePath: '/arena',
  disableListen: true,
});

module.exports = arena;

