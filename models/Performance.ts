import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPerformance extends Document {
    metric: string;
    achieved: number;
    target: number;
    icon: string; // Store icon name
    color: string;
    gradientId: string;
}

const PerformanceSchema: Schema = new Schema({
    metric: { type: String, required: true },
    achieved: { type: Number, required: true },
    target: { type: Number, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
    gradientId: { type: String, required: true },
});

const Performance: Model<IPerformance> = mongoose.models.Performance || mongoose.model<IPerformance>('Performance', PerformanceSchema);

export default Performance;
