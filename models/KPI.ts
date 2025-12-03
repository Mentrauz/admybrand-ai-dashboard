import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IKPI extends Document {
    title: string;
    value: number;
    change: number;
    changeType: 'positive' | 'negative';
    icon: string; // Store icon name
    prefix: string;
    suffix: string;
    baseValue: number;
    trend: number;
}

const KPISchema: Schema = new Schema({
    title: { type: String, required: true },
    value: { type: Number, required: true },
    change: { type: Number, required: true },
    changeType: { type: String, enum: ['positive', 'negative'], required: true },
    icon: { type: String, required: true },
    prefix: { type: String, default: '' },
    suffix: { type: String, default: '' },
    baseValue: { type: Number, required: true },
    trend: { type: Number, required: true },
});

const KPI: Model<IKPI> = mongoose.models.KPI || mongoose.model<IKPI>('KPI', KPISchema);

export default KPI;
