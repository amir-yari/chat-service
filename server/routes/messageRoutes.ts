import { Router } from "express";
import { getMessages } from "../controllers/messageControllers";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API for managing messages
 */

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Retrieve messages
 *     description: Fetch messages for a specific user with optional pagination.
 *     tags: [Messages]
 *     parameters:
 *       - in: query
 *         name: userId
 *         description: ID of the user whose messages are to be retrieved.
 *         required: true
 *         schema:
 *           type: string
 *           example: "507f1f77bcf86cd799439011"
 *       - in: query
 *         name: sessionLimit
 *         description: Maximum number of sessions to retrieve.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 5
 *       - in: query
 *         name: messageLimit
 *         description: Maximum number of messages to retrieve.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: sessionPage
 *         description: Page number for sessions.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: messagePage
 *         description: Page number for messages.
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: A list of messages for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   text:
 *                     type: string
 *                   senderId:
 *                     type: string
 *                   receiverId:
 *                     type: string
 *                   sessionId:
 *                     type: string
 *       404:
 *         description: No messages found
 *       500:
 *         description: Failed to load messages
 */
router.get("/", getMessages);

export default router;
