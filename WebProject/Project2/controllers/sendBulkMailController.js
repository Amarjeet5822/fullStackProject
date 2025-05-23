const mainQueue = require("../queue/mainQueue");
const { User } = require("../models/index");

const sendBulkEmails = async (req, res) => {
  try {
    // ✅ Immediately send response to user
    res.status(202).json({ message: "Email sending started in background" });

    const pageSize = 10;
    const { count: totalUsers } = await User.findAndCountAll({ limit: 1 });

    const totalPages = Math.ceil(totalUsers / pageSize);

    for (let page = 0; page < totalPages; page++) {
      const users = await User.findAll({
        limit: pageSize,
        offset: page * pageSize,
      });

      // ✅ Queue all emails in current page
      await Promise.all(
        users.map((user) =>
          mainQueue.add(
            {
              taskName: "sendMail",
              to: user.email,
              name: user.name,
              subject: "Welcome to our platform Wortal!",
              body: "Enjoy our services!",
            },
            {
              removeOnComplete: true,
              removeOnFail: false,
              attempts: 2,
              backoff: 5000,
              lifo: true,
            }
          ).then(() => console.log(`✅ Queued: ${user.name}`))
        )
      );

      console.log(`⏳ Page ${page + 1}/${totalPages} done. Waiting 2s...`);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Delay before next page
    }

    console.log("🎉 All users queued for email sending.");
  } catch (err) {
    console.error("❌ Background email process failed:", err);
  }
};

module.exports = sendBulkEmails;
