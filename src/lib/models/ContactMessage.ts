import mongoose, { Document, Schema } from 'mongoose';

interface ILocalizedString {
  en: string;
  ar: string;
  tr: string;
}

interface IContactMessage extends Document {
  name: ILocalizedString;
  email: string;
  message: ILocalizedString;
}

const localizedStringSchema = new Schema<ILocalizedString>({
  en: { type: String, required: true },
  ar: { type: String, required: true },
  tr: { type: String, required: true },
});

const contactMessageSchema = new Schema<IContactMessage>({
  name: localizedStringSchema,
  email: { type: String, required: true },
  message: localizedStringSchema,
});

const ContactMessage = mongoose.models.ContactMessage || mongoose.model<IContactMessage>('ContactMessage', contactMessageSchema);

export default ContactMessage;
