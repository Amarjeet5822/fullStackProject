const date = new Date();
const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 mins in ms
module.exports = new Date(date.getTime() + istOffset);
console.log("IST Time:", istDate.toISOString());
