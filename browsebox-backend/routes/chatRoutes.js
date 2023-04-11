/*
    Routes concerning conversation and message actions, such as creating conversations,
    fetching conversations, sending messages, and fetching messages.
*/

const express = require('express');
const conversationControllers = require('../controllers/chatControllers');

const router = express.Router();

router.post('/create-conversation', conversationControllers.createConversation);
router.get('/user/:user_id/conversations', conversationControllers.getConversations);
router.post('/send-message', conversationControllers.createConversation);
router.get('/conversation/:conversation_id/messages', conversationControllers.getMessages);


module.exports = router;
