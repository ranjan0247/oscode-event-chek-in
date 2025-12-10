import { FileUploader } from '@/components/file-uploader';

export default function AdminPage() {
  return (
    <div className="container mx-auto">
      <section className="text-center my-8 md:my-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
          Admin Portal
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Upload and process your guest list from an Excel sheet.
        </p>
      </section>
      <div className="max-w-2xl mx-auto">
        <FileUploader />
      </div>
    </div>
  );
}
