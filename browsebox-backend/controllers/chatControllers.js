const db = require("../util/datapool");

/**
 * Create a new conversation between two users
 */
exports.createConversation = async (req, res, next) => {
    const user1_id = req.body.user1_id;
    const user2_id = req.body.user2_id;
    const sale_id = req.body.sale_id;

    if (user1_id === undefined || user2_id === undefined || sale_id === undefined) {
        res.status(400).send("Bad request. One or more required parameters are missing or undefined.");
        return;
    }

    try {
        const result = await db.execute(
            "INSERT INTO browsebox.conversations (user1_id, user2_id, sale_id) VALUES (?, ?, ?)",
            [user1_id, user2_id, sale_id]
        );
        const conversationId = result[0].insertId;
        res.status(201).json({ message: "Conversation created successfully.", conversation_id: conversationId });
    } catch (err) {
        res.status(500).send(err);
    }
};

/**
 * Fetch all conversations for a user
 */
exports.getConversations = (req, res, next) => {
    const user_id = req.params.user_id;

    db.execute(
        "SELECT * FROM browsebox.conversations WHERE user1_id = ? OR user2_id = ?",
        [user_id, user_id]
    )
        .then((results) => res.status(200).json(results[0]))
        .catch((err) => {
            res.status(500).send(err);
        });
};

/**
 * Create a new message in a conversation
 */
exports.createConversation = async (req, res, next) => {
    const user1_id = req.body.user1_id;
    const user2_id = req.body.user2_id;
    const sale_id = req.body.sale_id;

    if (user1_id === undefined || user2_id === undefined || sale_id === undefined) {
        res.status(400).send("Bad request. One or more required parameters are missing or undefined.");
        return;
    }

    try {
        let conversationId = await exports.findConversation(user1_id, user2_id, sale_id);

        if (conversationId === null) {
            const result = await db.execute(
                "INSERT INTO browsebox.conversations (user1_id, user2_id, sale_id) VALUES (?, ?, ?)",
                [user1_id, user2_id, sale_id]
            );
            conversationId = result[0].insertId;
        }
        res.status(201).json({ message: "Conversation created successfully.", conversation_id: conversationId });
    } catch (err) {
        res.status(500).send(err);
    }
};

/**
 * Fetch all messages in a conversation
 */
exports.getMessages = (req, res, next) => {
    const conversation_id = req.params.conversation_id;

    db.execute(
        "SELECT * FROM browsebox.messages WHERE conversation_id = ? ORDER BY message_timestamp ASC",
        [conversation_id]
    )
        .then((results) => res.status(200).json(results[0]))
        .catch((err) => {
            res.status(500).send(err);
        });
};

/**
 * This is a helper function to find a conversation between two users
 * It is here because it is used in both createConversation and createMessage
 * so that if a user already has a conversation about a sale, it will not create a new one
 */
exports.findConversation = async (user1_id, user2_id, sale_id) => {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM browsebox.conversations WHERE ((user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)) AND sale_id = ?",
            [user1_id, user2_id, user2_id, user1_id, sale_id]
        );
        return rows.length > 0 ? rows[0].conversation_id : null;
    } catch (err) {
        throw err;
    }
};
