import mongoose, { Document, Model, Schema } from "mongoose";

export interface IMessage extends Document {
  name: string;
  email: string;
  message: {
    lacale: string;
    text: string;
  };
}

const messageSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: {
    locale: { type: String, required: true },
    text: { type: String, required: true },
  },
});

const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default Message;
