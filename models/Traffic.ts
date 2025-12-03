import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITraffic extends Document {
    name: string;
    value: number;
    color: string;
}

const TrafficSchema: Schema = new Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true },
    color: { type: String, required: true },
});

const Traffic: Model<ITraffic> = mongoose.models.Traffic || mongoose.model<ITraffic>('Traffic', TrafficSchema);

export default Traffic;
