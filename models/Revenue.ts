import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRevenue extends Document {
    month: string;
    revenue: number;
    users: number;
}

const RevenueSchema: Schema = new Schema({
    month: { type: String, required: true },
    revenue: { type: Number, required: true },
    users: { type: Number, required: true },
});

const Revenue: Model<IRevenue> = mongoose.models.Revenue || mongoose.model<IRevenue>('Revenue', RevenueSchema);

export default Revenue;
