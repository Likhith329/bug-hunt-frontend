export type ChatMessage = {
  id: string;
  senderId: string;
  receiverId?: string; // Only for direct messages
  groupId?: string; // Only for group chats
  content: string;
  timestamp: number;
  type: "text" | "image" | "code" | "system"; // Different message types
  seenBy: string[]; // Users who have read the message
};
