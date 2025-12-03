import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICustomer extends Document {
    customer: string;
    email: string;
    status: 'Active' | 'Inactive' | 'Pending';
    revenue: number;
    lastActivity: string; // Keeping as string for simplicity to match frontend "2 hours ago" logic, or could be Date
    joinDate: string;
    region: string;
}

const CustomerSchema: Schema = new Schema({
    customer: { type: String, required: true },
    email: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Inactive', 'Pending'], required: true },
    revenue: { type: Number, required: true },
    lastActivity: { type: String, required: true },
    joinDate: { type: String, required: true },
    region: { type: String, required: true },
});

const Customer: Model<ICustomer> = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema);

export default Customer;
