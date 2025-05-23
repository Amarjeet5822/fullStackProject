const { sendWebEmail } = require("../services/mailer");
const ejs = require("ejs");
const path = require("path");

async function handle(arg) {
  try {
    const {to, body="Welcome to Wortal ", subject, name, } = arg || {};
    const templatePath = path.join(__dirname, "../views", "index.ejs");
    const html =await ejs.renderFile(templatePath, {name, body, title:"Welcome to wortal" });
    const result = await sendWebEmail(to, subject, html, body );
    console.log("result queue task, ::: ", result);
    return  result
  } catch (error) {
    throw error;
  }
}

module.exports = handle;