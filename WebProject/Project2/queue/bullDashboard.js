const Queue = require("bull");
const { createBullBoard } = require("@bull-board/api");
const { BullAdapter } = require("@bull-board/api/bullAdapter");
const { ExpressAdapter } = require("@bull-board/express");

const LowTaskQueue = new Queue("Low Task Queue", {
  redis: { port: 6379, host: "127.0.0.1", password: "" },
});
const MediumTaskQueue = new Queue("Medium Task Queue");
const HighTaskQueue = new Queue("High Task Queue");
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [
    new BullAdapter(HighTaskQueue),
    new BullAdapter(MediumTaskQueue),
    new BullAdapter(LowTaskQueue),
  ],
  serverAdapter: serverAdapter,
});

module.exports = serverAdapter;
