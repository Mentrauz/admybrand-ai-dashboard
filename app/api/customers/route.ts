import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

const initialCustomerData = [
    {
        customer: "John Doe",
        email: "john@example.com",
        status: "Active",
        revenue: 1234.56,
        lastActivity: "2 hours ago",
        joinDate: "2024-01-15",
        region: "North America",
    },
    {
        customer: "Jane Smith",
        email: "jane@example.com",
        status: "Inactive",
        revenue: 987.65,
        lastActivity: "1 day ago",
        joinDate: "2024-02-20",
        region: "Europe",
    },
    {
        customer: "Bob Johnson",
        email: "bob@example.com",
        status: "Active",
        revenue: 2345.67,
        lastActivity: "30 minutes ago",
        joinDate: "2024-01-10",
        region: "North America",
    },
    {
        customer: "Alice Brown",
        email: "alice@example.com",
        status: "Pending",
        revenue: 567.89,
        lastActivity: "3 hours ago",
        joinDate: "2024-03-05",
        region: "Asia",
    },
    {
        customer: "Charlie Davis",
        email: "charlie@example.com",
        status: "Active",
        revenue: 3456.78,
        lastActivity: "1 hour ago",
        joinDate: "2024-01-25",
        region: "Europe",
    },
    {
        customer: "Diana Wilson",
        email: "diana@example.com",
        status: "Inactive",
        revenue: 890.12,
        lastActivity: "2 days ago",
        joinDate: "2024-02-14",
        region: "North America",
    },
    {
        customer: "Ethan Moore",
        email: "ethan@example.com",
        status: "Active",
        revenue: 4567.89,
        lastActivity: "15 minutes ago",
        joinDate: "2024-03-01",
        region: "Asia",
    },
    {
        customer: "Fiona Taylor",
        email: "fiona@example.com",
        status: "Pending",
        revenue: 1234.56,
        lastActivity: "4 hours ago",
        joinDate: "2024-02-28",
        region: "Europe",
    },
];

export async function GET(request: Request) {
    try {
        const db = await dbConnect();

        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const status = searchParams.get('status') || 'all';
        const region = searchParams.get('region') || 'all';
        const sortField = searchParams.get('sortField') || 'customer';
        const sortOrder = searchParams.get('sortOrder') || 'asc';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '5');

        if (!db) {
            // If no database, use mock data with filtering
            let filteredData = [...initialCustomerData];

            // Apply search filter
            if (search) {
                filteredData = filteredData.filter(customer =>
                    customer.customer.toLowerCase().includes(search.toLowerCase()) ||
                    customer.email.toLowerCase().includes(search.toLowerCase())
                );
            }

            // Apply status filter
            if (status !== 'all') {
                filteredData = filteredData.filter(customer => customer.status === status);
            }

            // Apply region filter
            if (region !== 'all') {
                filteredData = filteredData.filter(customer => customer.region === region);
            }

            // Apply sorting
            filteredData.sort((a, b) => {
                const aValue = a[sortField as keyof typeof a];
                const bValue = b[sortField as keyof typeof b];

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    const comparison = aValue.localeCompare(bValue);
                    return sortOrder === 'asc' ? comparison : -comparison;
                }

                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
                }

                return 0;
            });

            // Apply pagination
            const total = filteredData.length;
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedData = filteredData.slice(startIndex, endIndex);

            return NextResponse.json({
                success: true,
                data: paginatedData,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                },
                note: "Using mock data - MongoDB not connected"
            });
        }

        // Seed if empty
        const count = await Customer.countDocuments();
        if (count === 0) {
            await Customer.insertMany(initialCustomerData);
        }

        const query: any = {};

        if (search) {
            query.$or = [
                { customer: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }

        if (status !== 'all') {
            query.status = status;
        }

        if (region !== 'all') {
            query.region = region;
        }

        const skip = (page - 1) * limit;

        const customers = await Customer.find(query)
            .sort({ [sortField]: sortOrder === 'asc' ? 1 : -1 })
            .skip(skip)
            .limit(limit);

        const total = await Customer.countDocuments(query);

        return NextResponse.json({
            success: true,
            data: customers,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const customer = await Customer.create(body);
        return NextResponse.json({ success: true, data: customer }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}
