const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");
const ExcelData = require("./excel.model");
const Order = require("./order.model");
const Payment = require("./payment.model");
const WebhookLog = require("./webhookLog.model");

Payment.belongsTo(Order, {
  foreignKey: "orderId",
  onDelete:"CASCADE"
})
Order.hasMany(Payment, {
  foreignKey: "orderId",
  onDelete: "CASCADE", // ✅ ADD this
});

User.hasMany(Order, {
  foreignKey:"userId",
  onDelete: "CASCADE"
});

Order.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Blog, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Blog.belongsTo(User, {
  foreignKey: "userId",
});

Comment.belongsTo(Blog, {
  foreignKey:"blogId",
  as:"blog",
});

Comment.belongsTo(User, {
  foreignKey:"userId",
  as:"author"
})

User.hasMany(Comment, {
  foreignKey: "userId",
  as: "comments",
  onDelete: "CASCADE", 
});


Payment.hasMany(WebhookLog, {
  foreignKey: "paymentId",
  as: "webhookLogs",
  onDelete:"CASCADE"
});

WebhookLog.belongsTo(Payment, {
   foreignKey: "paymentId"
})

module.exports = {
  User,
  Blog,
  Comment,
  ExcelData,
  Order,
  Payment,
  WebhookLog,

};
