const Queue = require("bull");
const mainQueue = new Queue("arena-queue", {
  redis: { host: '127.0.0.1', port: 6379 },
});

mainQueue.process(async(job)=>{
  try {
    const {taskName,...arg} = job.data
    const handle = require(`../tasks/${taskName}.js`)
    handle(arg)
  } catch (error) {
    console.log("Error in processing the queue job")
  }
})


module.exports = mainQueue
// mainQueue.add(taskName, to, subject, body ); call to add task in queue.