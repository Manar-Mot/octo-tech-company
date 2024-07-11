
import mongoose, { Document, Model, Schema } from 'mongoose';
interface IPartner extends Document {
  companyName: string;
  email: string;
  status: string;
}

const PartnerSchema: Schema = new Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: 'pending' },
});

const Partner: Model<IPartner> = mongoose.models.Partnership || mongoose.model('Partner', PartnerSchema);

export default Partner;
