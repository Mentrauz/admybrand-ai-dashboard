import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex h-screen">
      {/* Sidebar Skeleton */}
      <div className="w-64 border-r bg-background p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          
          {/* Navigation */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex h-16 items-center gap-2 border-b px-4">
          <Skeleton className="h-6 w-6" />
          <div className="flex flex-1 items-center gap-2 px-3">
            <Skeleton className="h-9 flex-1 max-w-md" />
            <div className="ml-auto flex items-center gap-2">
              <Skeleton className="h-9 w-[280px]" />
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-9 w-9" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 space-y-4">
          {/* Title */}
          <div className="py-4 space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>

          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-24 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Large Chart */}
            <Card className="col-span-full lg:col-span-2">
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>

            {/* Small Chart */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-4 w-40" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>

            {/* Full Width Chart */}
            <Card className="col-span-full">
              <CardHeader>
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-4 w-52" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] w-full" />
              </CardContent>
            </Card>
          </div>

          {/* Data Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-8 w-24" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Filters */}
              <div className="flex gap-4">
                <Skeleton className="h-9 flex-1" />
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-9 w-32" />
              </div>

              {/* Table */}
              <div className="space-y-2">
                {/* Header */}
                <div className="flex gap-4 p-3 border rounded">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
                
                {/* Rows */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex gap-4 p-3 border rounded">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-48" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
