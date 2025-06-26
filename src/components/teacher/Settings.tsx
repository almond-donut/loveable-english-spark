import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Akun</CardTitle>
          <CardDescription>Kelola informasi profil dan preferensi Anda.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input id="name" defaultValue="Guru John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Alamat Email</Label>
            <Input id="email" type="email" defaultValue="guru.johndoe@example.com" disabled />
          </div>
          <Button>Simpan Perubahan</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifikasi</CardTitle>
          <CardDescription>Atur preferensi notifikasi Anda.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="quiz-notification">Notifikasi saat siswa menyelesaikan kuis</Label>
            <Switch id="quiz-notification" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="assignment-notification">Notifikasi pengingat tugas</Label>
            <Switch id="assignment-notification" />
          </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Keamanan</CardTitle>
          <CardDescription>Ubah kata sandi Anda.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="current-password">Kata Sandi Saat Ini</Label>
                <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="new-password">Kata Sandi Baru</Label>
                <Input id="new-password" type="password" />
            </div>
            <Button variant="destructive">Ubah Kata Sandi</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
