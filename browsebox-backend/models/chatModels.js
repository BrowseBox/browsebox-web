/**
 * Create Conversation object from database
 */
module.exports.Conversation = class Conversation {
    constructor(conversation_id, user1_id, user2_id, sale_id) {
        this.conversation_id = conversation_id;
        this.user1_id = user1_id;
        this.user2_id = user2_id;
        this.sale_id = sale_id;
    }
};

/**
 * Create Message object from database
 */
module.exports.Message = class Message {
    constructor(message_id, conversation_id, speaker_id, message_content, message_timestamp) {
        this.message_id = message_id;
        this.conversation_id = conversation_id;
        this.speaker_id = speaker_id;
        this.message_content = message_content;
        this.message_timestamp = message_timestamp;
    }
};
