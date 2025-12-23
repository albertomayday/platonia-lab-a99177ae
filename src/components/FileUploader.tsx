import { useState } from 'react';
import { useFileUpload } from '@/hooks/useBackend';
import { Button } from '@/components/ui/button';

const FileUploader: React.FC = () => {
  const [selected, setSelected] = useState<File | null>(null);
  const uploadMutation = useFileUpload();

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelected(file);
  };

  const onUpload = async () => {
    if (!selected || uploadMutation.isPending) return;
    try {
      await uploadMutation.mutateAsync(selected);
      setSelected(null);
    } catch (e) {
      // handled in mutation error
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          type="file"
          onChange={onSelect}
          className="text-sm"
        />
        <Button onClick={onUpload} disabled={!selected || uploadMutation.isPending}>
          {uploadMutation.isPending ? 'Subiendo...' : 'Subir'}
        </Button>
      </div>
      {uploadMutation.error && (
        <p className="text-xs text-destructive">{uploadMutation.error.message}</p>
      )}
      {uploadMutation.data?.upload && (
        <div className="text-xs text-muted-foreground">
          <div>Archivo: <span className="text-foreground">{uploadMutation.data.upload.filename}</span></div>
          {uploadMutation.data.upload.publicUrl && (
            <div>URL: <a className="text-primary underline" href={uploadMutation.data.upload.publicUrl} target="_blank" rel="noreferrer">abrir</a></div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
