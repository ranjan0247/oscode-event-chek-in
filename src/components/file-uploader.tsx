'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Loader, FileCheck2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select an Excel file to upload.',
      });
      return;
    }

    setIsUploading(true);

    // Simulate file processing and Firestore push
    setTimeout(() => {
      setIsUploading(false);
      
      toast({
        title: 'Upload Successful',
        description: `"${file.name}" has been processed and data is now live.`,
        action: <FileCheck2 />,
      });

      // Reset file input
      setFile(null);
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    }, 2000); // 2-second delay for simulation
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Upload />
          Upload Guest List
        </CardTitle>
        <CardDescription>
          Select an .xlsx or .csv file. The data will be synced with the database.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-accent hover:bg-secondary/80 transition-colors"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
              <p className="mb-2 text-sm text-foreground">
                <span className="font-semibold text-primary">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                {file ? file.name : 'XLSX, CSV (MAX. 5MB)'}
              </p>
            </div>
            <Input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".xlsx,.xls,.csv"
              ref={fileInputRef}
            />
          </label>
        </div>

        <Button onClick={handleUpload} disabled={isUploading || !file} className="w-full">
          {isUploading ? (
            <Loader className="animate-spin mr-2 h-4 w-4" />
          ) : (
            <Upload className="mr-2 h-4 w-4" />
          )}
          {isUploading ? 'Processing...' : 'Upload & Sync'}
        </Button>
      </CardContent>
    </Card>
  );
}
