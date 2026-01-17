"use client";
import { DataProvider } from '@/context/DataContext';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      {children}
      <Toaster position="top-center" richColors />
    </DataProvider>
  );
}
