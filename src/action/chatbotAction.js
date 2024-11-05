import { chatbotService } from "../services/chatbot.services";

export const ChatbotAction = async (input, externalSessionId, projectId, apiKey) => {
  console.log("action", input, externalSessionId, projectId);
  try {
    const res = await chatbotService(input, externalSessionId, projectId, apiKey);
    console.log("res action", res, externalSessionId, projectId);
    return res;
  } catch (error) {
    console.error('Error invoking chatbot service:', error);
    throw error;
  }
};
