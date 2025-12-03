import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import KPI from '@/models/KPI';
import Revenue from '@/models/Revenue';
import Traffic from '@/models/Traffic';
import Performance from '@/models/Performance';

// Initial Data for Seeding
const initialKpiData = [
    {
        title: "Total Revenue",
        value: 45231.89,
        change: 20.1,
        changeType: "positive",
        icon: "DollarSign",
        prefix: "$",
        suffix: "",
        baseValue: 45231.89,
        trend: 1.2,
    },
    {
        title: "Active Users",
        value: 2350,
        change: 180.1,
        changeType: "positive",
        icon: "Users",
        prefix: "",
        suffix: "",
        baseValue: 2350,
        trend: 0.8,
    },
    {
        title: "Conversions",
        value: 12234,
        change: 19,
        changeType: "positive",
        icon: "TrendingUp",
        prefix: "",
        suffix: "",
        baseValue: 12234,
        trend: 1.1,
    },
    {
        title: "Growth Rate",
        value: 23.5,
        change: 2.1,
        changeType: "positive",
        icon: "Percent",
        prefix: "",
        suffix: "%",
        baseValue: 23.5,
        trend: 0.15,
    },
];

const initialRevenueData = [
    { month: 'Jan', revenue: 15000, users: 1200 },
    { month: 'Feb', revenue: 18000, users: 1350 },
    { month: 'Mar', revenue: 22000, users: 1800 },
    { month: 'Apr', revenue: 19000, users: 1600 },
    { month: 'May', revenue: 25000, users: 2100 },
    { month: 'Jun', revenue: 28000, users: 2350 },
    { month: 'Jul', revenue: 32000, users: 2800 },
    { month: 'Aug', revenue: 29000, users: 2650 },
    { month: 'Sep', revenue: 35000, users: 3200 },
    { month: 'Oct', revenue: 38000, users: 3500 },
    { month: 'Nov', revenue: 42000, users: 4100 },
    { month: 'Dec', revenue: 45000, users: 4800 },
];

const initialTrafficData = [
    { name: 'Organic Search', value: 35, color: 'hsl(var(--chart-1))' },
    { name: 'Social Media', value: 25, color: 'hsl(var(--chart-2))' },
    { name: 'Direct', value: 20, color: 'hsl(var(--chart-3))' },
    { name: 'Email', value: 12, color: 'hsl(var(--chart-4))' },
    { name: 'Referral', value: 8, color: 'hsl(var(--chart-5))' },
];

const initialPerformanceData = [
    {
        metric: 'Revenue',
        achieved: 113,
        target: 100,
        icon: "DollarSign",
        color: '#3b82f6',
        gradientId: 'revenueGradient',
    },
    {
        metric: 'Conversions',
        achieved: 122,
        target: 100,
        icon: "Target",
        color: '#10b981',
        gradientId: 'conversionsGradient',
    },
    {
        metric: 'Sessions',
        achieved: 114,
        target: 100,
        icon: "TrendingUp",
        color: '#8b5cf6',
        gradientId: 'sessionsGradient',
    },
    {
        metric: 'Users',
        achieved: 96,
        target: 100,
        icon: "Users",
        color: '#f59e0b',
        gradientId: 'usersGradient',
    },
    {
        metric: 'Bounce Rate',
        achieved: 125,
        target: 100,
        icon: "MousePointer",
        color: '#ef4444',
        gradientId: 'bounceGradient',
    },
];

// Function to generate realistic fluctuations
const generateFluctuation = (baseValue: number, trend: number, isPercentage: boolean = false) => {
    const maxChange = isPercentage ? 0.1 : baseValue * 0.002; // 0.1 for percentages, 0.2% for regular values
    const randomChange = (Math.random() - 0.5) * 2 * maxChange;
    const trendInfluence = trend * (Math.random() * 0.5 + 0.5); // 50-100% of trend applied

    return baseValue + randomChange + trendInfluence;
};

export async function GET() {
    try {
        const db = await dbConnect();

        // If database connection failed, return mock data
        if (!db) {
            return NextResponse.json({
                success: true,
                data: {
                    kpis: initialKpiData,
                    revenue: initialRevenueData,
                    traffic: initialTrafficData,
                    performance: initialPerformanceData
                },
                note: "Using mock data - MongoDB not connected"
            });
        }

        // Check if data exists, if not seed it
        const kpiCount = await KPI.countDocuments();
        if (kpiCount === 0) {
            await KPI.insertMany(initialKpiData);
        }

        const revenueCount = await Revenue.countDocuments();
        if (revenueCount === 0) {
            await Revenue.insertMany(initialRevenueData);
        }

        const trafficCount = await Traffic.countDocuments();
        if (trafficCount === 0) {
            await Traffic.insertMany(initialTrafficData);
        }

        const performanceCount = await Performance.countDocuments();
        if (performanceCount === 0) {
            await Performance.insertMany(initialPerformanceData);
        }

        const kpis = await KPI.find({});
        const revenue = await Revenue.find({});
        const traffic = await Traffic.find({});
        const performance = await Performance.find({});

        return NextResponse.json({
            success: true,
            data: {
                kpis,
                revenue,
                traffic,
                performance
            }
        });

    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}

export async function PUT() {
    try {
        const db = await dbConnect();

        let kpis, revenue, traffic, performance;

        if (!db) {
            // If database not connected, simulate updates on mock data
            kpis = initialKpiData.map(kpi => {
                const isPercentage = kpi.suffix === "%";
                const newValue = generateFluctuation(kpi.baseValue, kpi.trend, isPercentage);
                const changeFromBase = ((newValue - kpi.baseValue) / kpi.baseValue) * 100;

                return {
                    ...kpi,
                    value: Math.max(0, newValue),
                    change: Math.abs(changeFromBase),
                    changeType: changeFromBase >= 0 ? "positive" : "negative",
                    baseValue: kpi.baseValue + (kpi.trend * 0.1),
                };
            });

            // Update revenue data (simulate only last 3 months)
            revenue = initialRevenueData.map((item, index) => {
                if (index >= initialRevenueData.length - 3) {
                    return {
                        ...item,
                        revenue: generateRevenueFluctuation(item.revenue, 'revenue'),
                        users: generateRevenueFluctuation(item.users, 'users'),
                    };
                }
                return item;
            });

            // Update traffic data
            const updatedTraffic = initialTrafficData.map(item => ({
                ...item,
                value: generateTrafficFluctuation(item.value)
            }));

            // Normalize to ensure total is close to 100%
            const total = updatedTraffic.reduce((sum, item) => sum + item.value, 0);
            traffic = updatedTraffic.map(item => ({
                ...item,
                value: Math.round((item.value / total) * 100)
            }));

            // Update performance data
            performance = initialPerformanceData.map(item => ({
                ...item,
                achieved: generatePerformanceFluctuation(item.achieved)
            }));

        } else {
            // Update KPI data with realistic fluctuations
            const existingKpis = await KPI.find({});
            for (const kpi of existingKpis) {
                const isPercentage = kpi.suffix === "%";
                const newValue = generateFluctuation(kpi.baseValue, kpi.trend, isPercentage);
                const changeFromBase = ((newValue - kpi.baseValue) / kpi.baseValue) * 100;

                // Update base value slowly to simulate overall growth
                const newBaseValue = kpi.baseValue + (kpi.trend * 0.1);

                await KPI.findByIdAndUpdate(kpi._id, {
                    value: Math.max(0, newValue),
                    change: Math.abs(changeFromBase),
                    changeType: changeFromBase >= 0 ? "positive" : "negative",
                    baseValue: newBaseValue,
                });
            }

            // Update revenue data (only the last few months for realistic effect)
            const existingRevenue = await Revenue.find({}).sort({ month: 1 });
            const monthsToUpdate = existingRevenue.slice(-3); // Only update last 3 months

            for (const item of monthsToUpdate) {
                const updatedRevenue = generateRevenueFluctuation(item.revenue, 'revenue');
                const updatedUsers = generateRevenueFluctuation(item.users, 'users');

                await Revenue.findByIdAndUpdate(item._id, {
                    revenue: Math.max(0, Math.round(updatedRevenue)),
                    users: Math.max(0, Math.round(updatedUsers)),
                });
            }

            // Update traffic data
            const existingTraffic = await Traffic.find({});
            const updatedTraffic = existingTraffic.map(item => ({
                ...item.toObject(),
                value: generateTrafficFluctuation(item.value)
            }));

            // Normalize to ensure total is close to 100%
            const total = updatedTraffic.reduce((sum, item) => sum + item.value, 0);
            const normalizedTraffic = updatedTraffic.map(item => ({
                ...item,
                value: Math.round((item.value / total) * 100)
            }));

            for (const item of normalizedTraffic) {
                await Traffic.findByIdAndUpdate(item._id, { value: item.value });
            }

            // Update performance data
            const existingPerformance = await Performance.find({});
            for (const item of existingPerformance) {
                const newAchieved = generatePerformanceFluctuation(item.achieved);
                await Performance.findByIdAndUpdate(item._id, {
                    achieved: Math.max(50, Math.min(150, Math.round(newAchieved)))
                });
            }

            // Return updated data
            kpis = await KPI.find({});
            revenue = await Revenue.find({});
            traffic = await Traffic.find({});
            performance = await Performance.find({});
        }

        return NextResponse.json({
            success: true,
            data: {
                kpis,
                revenue,
                traffic,
                performance
            }
        });

    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}

// Helper functions for data generation (moved from frontend)
const generateRevenueFluctuation = (baseValue: number, type: 'revenue' | 'users') => {
    const multiplier = type === 'revenue' ? 100 : 10;
    const maxChange = baseValue * 0.01; // 1% fluctuation
    const randomChange = (Math.random() - 0.5) * 2 * maxChange;
    const trendInfluence = Math.random() > 0.6 ? multiplier : -multiplier / 2; // 60% chance of positive trend

    return Math.max(0, Math.round(baseValue + randomChange + trendInfluence));
};

const generateTrafficFluctuation = (baseValue: number) => {
    const maxChange = 2; // Max 2% change in traffic distribution
    const randomChange = (Math.random() - 0.5) * 2 * maxChange;
    return Math.max(1, Math.min(50, Math.round(baseValue + randomChange)));
};

const generatePerformanceFluctuation = (baseValue: number) => {
    const maxChange = baseValue * 0.02; // 2% fluctuation
    const randomChange = (Math.random() - 0.5) * 2 * maxChange;
    return Math.max(50, Math.min(150, Math.round(baseValue + randomChange)));
};

// Background update endpoint - can be called by external services or scheduled tasks
export async function POST() {
    try {
        const db = await dbConnect();

        if (!db) {
            // If no database, just simulate the operation
            return NextResponse.json({
                success: true,
                message: "Dashboard data update simulated (no database connection)"
            });
        }

        // This endpoint can be used for manual triggers or scheduled updates
        // It performs the same update logic as PUT but doesn't return the data

        // Update KPI data with realistic fluctuations
        const kpis = await KPI.find({});
        for (const kpi of kpis) {
            const isPercentage = kpi.suffix === "%";
            const newValue = generateFluctuation(kpi.baseValue, kpi.trend, isPercentage);
            const changeFromBase = ((newValue - kpi.baseValue) / kpi.baseValue) * 100;

            // Update base value slowly to simulate overall growth
            const newBaseValue = kpi.baseValue + (kpi.trend * 0.1);

            await KPI.findByIdAndUpdate(kpi._id, {
                value: Math.max(0, newValue),
                change: Math.abs(changeFromBase),
                changeType: changeFromBase >= 0 ? "positive" : "negative",
                baseValue: newBaseValue,
            });
        }

        // Update revenue data (only the last few months for realistic effect)
        const revenue = await Revenue.find({}).sort({ month: 1 });
        const monthsToUpdate = revenue.slice(-3); // Only update last 3 months

        for (const item of monthsToUpdate) {
            const updatedRevenue = generateRevenueFluctuation(item.revenue, 'revenue');
            const updatedUsers = generateRevenueFluctuation(item.users, 'users');

            await Revenue.findByIdAndUpdate(item._id, {
                revenue: Math.max(0, Math.round(updatedRevenue)),
                users: Math.max(0, Math.round(updatedUsers)),
            });
        }

        // Update traffic data
        const traffic = await Traffic.find({});
        const updatedTraffic = traffic.map(item => ({
            ...item.toObject(),
            value: generateTrafficFluctuation(item.value)
        }));

        // Normalize to ensure total is close to 100%
        const total = updatedTraffic.reduce((sum, item) => sum + item.value, 0);
        const normalizedTraffic = updatedTraffic.map(item => ({
            ...item,
            value: Math.round((item.value / total) * 100)
        }));

        for (const item of normalizedTraffic) {
            await Traffic.findByIdAndUpdate(item._id, { value: item.value });
        }

        // Update performance data
        const performance = await Performance.find({});
        for (const item of performance) {
            const newAchieved = generatePerformanceFluctuation(item.achieved);
            await Performance.findByIdAndUpdate(item._id, {
                achieved: Math.max(50, Math.min(150, Math.round(newAchieved)))
            });
        }

        return NextResponse.json({
            success: true,
            message: "Dashboard data updated successfully"
        });

    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
