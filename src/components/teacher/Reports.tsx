import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Users, BookOpen } from 'lucide-react';

const Reports = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Laporan</CardTitle>
          <CardDescription>Ringkasan aktivitas dan performa siswa.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Kuis</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 kuis baru bulan ini</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">235</div>
                <p className="text-xs text-muted-foreground">+10 siswa baru bulan ini</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85.5</div>
                <p className="text-xs text-muted-foreground">Naik 5% dari bulan lalu</p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
             <h3 className="text-lg font-semibold mb-4">Fitur Lanjutan</h3>
            <p className="text-muted-foreground">
              Halaman laporan yang lebih detail akan segera tersedia, termasuk analisis per siswa, performa per kuis, dan lainnya.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
