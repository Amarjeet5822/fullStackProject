const Queue = require("bull");
const mainQueue = new Queue("arena-queue", {
  redis: { host: '127.0.0.1', port: 6379 },
  limiter: {
    max: 1000,
    duration: 5000
  }
});
mainQueue.process(async(job)=>{
  try {
    const {taskName,...arg} = job.data
    const handle = require(`../tasks/${taskName}.js`)
    const result = await handle(arg)
    return result;
  } catch (error) {
    console.log("Error in processing the queue job")
    throw error
  }
});

// ✅ On success
mainQueue.on("completed", (job, result) => {
  console.log("✅ Job completed successfully:", result.toString());
});

// ✅ On failure
mainQueue.on("failed", (job, err) => {
  console.error("❌ Job failed:", err.message);
});
module.exports = mainQueue
// mainQueue.add(taskName, to, subject, body ); call to add task in queue.