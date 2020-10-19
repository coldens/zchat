export interface CreateMessageBody {
  id: string;
  conversationId: string;
  from: {
    type: string;
    value: string;
  };
  body: {
    type: string;
    value: string;
  };
}
