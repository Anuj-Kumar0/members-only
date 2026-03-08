const { Router } = require("express");
const messageController = require("../controllers/messageController");
const ensureAuth = require("../middleware/authMiddleware");

const router = Router();

router.get("/", messageController.homePage);

router.get("/messages/new", ensureAuth, messageController.newMessageGet);

router.post("/messages/new", ensureAuth, messageController.newMessagePost);

router.post(
    "/messages/:id/delete",
    ensureAuth,
    messageController.deleteMessage
  );

module.exports = router;