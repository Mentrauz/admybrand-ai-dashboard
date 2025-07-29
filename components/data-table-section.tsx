"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronsUpDown, 
  Search, 
  Download, 
  Filter,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Extended mock data
const tableData = [
  {
    id: "1",
    customer: "John Doe",
    email: "john@example.com",
    status: "Active",
    revenue: 1234.56,
    lastActivity: "2 hours ago",
    joinDate: "2024-01-15",
    region: "North America",
  },
  {
    id: "2", 
    customer: "Jane Smith",
    email: "jane@example.com",
    status: "Inactive",
    revenue: 987.65,
    lastActivity: "1 day ago",
    joinDate: "2024-02-20",
    region: "Europe",
  },
  {
    id: "3",
    customer: "Bob Johnson", 
    email: "bob@example.com",
    status: "Active",
    revenue: 2345.67,
    lastActivity: "30 minutes ago",
    joinDate: "2024-01-10",
    region: "North America",
  },
  {
    id: "4",
    customer: "Alice Brown",
    email: "alice@example.com", 
    status: "Pending",
    revenue: 567.89,
    lastActivity: "3 hours ago",
    joinDate: "2024-03-05",
    region: "Asia",
  },
  {
    id: "5",
    customer: "Charlie Davis",
    email: "charlie@example.com",
    status: "Active", 
    revenue: 3456.78,
    lastActivity: "1 hour ago",
    joinDate: "2024-01-25",
    region: "Europe",
  },
  {
    id: "6",
    customer: "Diana Wilson",
    email: "diana@example.com",
    status: "Inactive",
    revenue: 890.12,
    lastActivity: "2 days ago", 
    joinDate: "2024-02-14",
    region: "North America",
  },
  {
    id: "7",
    customer: "Ethan Moore",
    email: "ethan@example.com",
    status: "Active",
    revenue: 4567.89,
    lastActivity: "15 minutes ago",
    joinDate: "2024-03-01",
    region: "Asia",
  },
  {
    id: "8", 
    customer: "Fiona Taylor",
    email: "fiona@example.com",
    status: "Pending",
    revenue: 1234.56,
    lastActivity: "4 hours ago",
    joinDate: "2024-02-28",
    region: "Europe",
  },
]

type SortField = 'customer' | 'revenue' | 'lastActivity' | 'status'

export function DataTableSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")
  const [sortField, setSortField] = useState<SortField>('customer')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    let filtered = tableData.filter(item => {
      const matchesSearch = item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter
      const matchesRegion = regionFilter === 'all' || item.region === regionFilter
      
      return matchesSearch && matchesStatus && matchesRegion
    })

    // Sort data
    filtered.sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]
      
      if (sortField === 'revenue') {
        aValue = a.revenue
        bValue = b.revenue
      } else if (typeof aValue === 'string') {
        aValue = a[sortField].toLowerCase()
        bValue = b[sortField].toLowerCase()
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return filtered
  }, [searchTerm, statusFilter, regionFilter, sortField, sortOrder])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredAndSortedData.slice(startIndex, endIndex)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ChevronsUpDown className="h-4 w-4 transition-colors duration-200 group-hover:text-primary" />
    return sortOrder === 'asc' ? 
      <ChevronUp className="h-4 w-4 text-primary transition-all duration-200" /> : 
      <ChevronDown className="h-4 w-4 text-primary transition-all duration-200" />
  }

  const exportToCSV = () => {
    const headers = ['Customer', 'Email', 'Status', 'Revenue', 'Last Activity', 'Join Date', 'Region']
    const csvContent = [
      headers.join(','),
      ...filteredAndSortedData.map(row => [
        row.customer,
        row.email,
        row.status,
        row.revenue,
        row.lastActivity,
        row.joinDate,
        row.region
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'customers-data.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div>
      <Card className="transition-all duration-500 hover:shadow-sm border-border/50 hover:border-border animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 transition-all duration-300 hover:text-primary/90">
                <div className="h-2 w-2 bg-chart-3 rounded-full transition-all duration-300 hover:scale-125"></div>
                Customer Analytics
              </CardTitle>
              <CardDescription className="transition-colors duration-300">
                Manage and analyze your customer data with advanced filtering and sorting
              </CardDescription>
            </div>
            <Button 
              onClick={exportToCSV} 
              variant="outline" 
              size="sm"
              className="transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:border-primary/20 hover:shadow-sm hover:scale-105 group"
            >
              <Download className="h-4 w-4 mr-2 transition-all duration-300 group-hover:translate-y-px group-hover:scale-110" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in-0 slide-in-from-top-2 duration-500 delay-300">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground transition-all duration-300 hover:text-primary" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary/50 hover:border-primary/30 focus:scale-[1.01] transform-gpu"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[140px] transition-all duration-300 hover:border-primary/30 focus:ring-2 focus:ring-primary/20 hover:shadow-sm hover:scale-105">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="animate-in fade-in-0 zoom-in-95 duration-300">
                <SelectItem value="all" className="transition-all duration-200 focus:bg-accent hover:bg-accent/50">All Status</SelectItem>
                <SelectItem value="Active" className="transition-all duration-200 focus:bg-accent hover:bg-accent/50">Active</SelectItem>
                <SelectItem value="Inactive" className="transition-all duration-200 focus:bg-accent hover:bg-accent/50">Inactive</SelectItem>
                <SelectItem value="Pending" className="transition-all duration-200 focus:bg-accent hover:bg-accent/50">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-full sm:w-[140px] transition-all duration-300 hover:border-primary/30 focus:ring-2 focus:ring-primary/20 hover:shadow-sm hover:scale-105">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent className="animate-in fade-in-0 zoom-in-95 duration-300">
                <SelectItem value="all" className="transition-all duration-200 focus:bg-accent hover:bg-accent/50">All Regions</SelectItem>
                <SelectItem value="North America" className="transition-all duration-200 focus:bg-accent hover:bg-accent/50">North America</SelectItem>
                <SelectItem value="Europe" className="transition-all duration-200 focus:bg-accent hover:bg-accent/50">Europe</SelectItem>
                <SelectItem value="Asia" className="transition-all duration-200 focus:bg-accent hover:bg-accent/50">Asia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border transition-all duration-300 hover:border-border hover:shadow-sm animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-500">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-muted/30 transition-all duration-300">
                  <TableHead className="w-[200px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('customer')}
                      className="h-auto p-0 font-semibold transition-all duration-300 hover:text-primary group hover:scale-105"
                    >
                      Customer
                      {getSortIcon('customer')}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold transition-colors duration-300 hover:text-primary/80">Email</TableHead>
                  <TableHead className="font-semibold transition-colors duration-300 hover:text-primary/80">Status</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('revenue')}
                      className="h-auto p-0 font-semibold transition-all duration-300 hover:text-primary group hover:scale-105"
                    >
                      Revenue
                      {getSortIcon('revenue')}
                    </Button>
                  </TableHead>
                  <TableHead className="font-semibold transition-colors duration-300 hover:text-primary/80">Last Activity</TableHead>
                  <TableHead className="font-semibold transition-colors duration-300 hover:text-primary/80">Region</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((row, index) => (
                  <TableRow 
                    key={row.id} 
                    className="hover:bg-muted/40 transition-all duration-300 cursor-pointer group animate-in fade-in-0 slide-in-from-left-2"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationDuration: '400ms'
                    }}
                  >
                    <TableCell className="font-medium transition-all duration-300 group-hover:text-primary group-hover:scale-105 origin-left">
                      {row.customer}
                    </TableCell>
                    <TableCell className="text-muted-foreground transition-all duration-300 group-hover:text-foreground/80">
                      {row.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          row.status === "Active" ? "default" : 
                          row.status === "Inactive" ? "secondary" : "outline"
                        }
                        className="transition-all duration-300 hover:opacity-80 hover:scale-105 cursor-pointer"
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono transition-all duration-300 group-hover:text-primary group-hover:font-semibold group-hover:scale-105 origin-left">
                      ${row.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-muted-foreground transition-all duration-300 group-hover:text-foreground/80">
                      {row.lastActivity}
                    </TableCell>
                    <TableCell className="transition-all duration-300 group-hover:text-primary/90 group-hover:font-medium">
                      {row.region}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between animate-in fade-in-0 slide-in-from-bottom-2 duration-500 delay-700">
            <div className="text-sm text-muted-foreground transition-colors duration-300">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedData.length)} of{" "}
              {filteredAndSortedData.length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="transition-all duration-300 hover:bg-accent hover:text-accent-foreground disabled:opacity-50 hover:scale-105 group"
              >
                <ChevronLeft className="h-4 w-4 transition-all duration-300 group-hover:-translate-x-1" />
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-10 transition-all duration-300 hover:bg-accent hover:text-accent-foreground hover:scale-110 hover:shadow-sm"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="transition-all duration-300 hover:bg-accent hover:text-accent-foreground disabled:opacity-50 hover:scale-105 group"
              >
                Next
                <ChevronRight className="h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
