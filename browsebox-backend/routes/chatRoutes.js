/*
    Routes concerning conversation and message actions, such as creating conversations,
    fetching conversations, sending messages, and fetching messages.
*/

const express = require('express');
const conversationControllers = require('../controllers/chatControllers');

const router = express.Router();

// router.post('/create-conversation', conversationControllers.createConversation);
router.get('/user/:user_id/conversations', conversationControllers.getConversations);
router.post('/try-make-conversation', conversationControllers.createConversation);
router.post('/send-message', conversationControllers.createMessage);
router.get('/conversation/:conversation_id/messages', conversationControllers.getMessages);


module.exports = router;
