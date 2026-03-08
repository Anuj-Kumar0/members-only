const messageModel = require("../models/messageModel");

exports.homePage = async (req, res) => {
  const messages = await messageModel.getAllMessages();

  res.render("index", {
    user: req.user,
    messages: messages
  });
};
;

exports.newMessageGet = (req, res) => {
  res.render("newMessage");
};

exports.newMessagePost = async (req, res) => {
  const { title, text } = req.body;

  await messageModel.createMessage(title, text, req.user.id);

  res.redirect("/");
};

exports.deleteMessage = async (req, res) => {

    if (!req.user.is_admin) {
      return res.status(403).send("Not authorized");
    }
  
    const messageId = req.params.id;
  
    await messageModel.deleteMessage(messageId);
  
    res.redirect("/");
  };