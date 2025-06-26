import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UploadCloud, FileText, X, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Define the props for the component, including a callback for when the quiz is generated
interface QuizGeneratorProps {
  onQuizGenerated: (quizData: any) => void;
  teacherId: string;
}

export const QuizGenerator: React.FC<QuizGeneratorProps> = ({ onQuizGenerated, teacherId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const acceptedFile = acceptedFiles[0];
      if (acceptedFile.type === 'application/pdf' || acceptedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(acceptedFile);
      } else {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload a PDF or DOCX file.',
          variant: 'destructive',
        });
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple: false,
  });

  const handleGenerateQuiz = async () => {
    if (!file) {
      toast({
        title: 'No File Selected',
        description: 'Please upload a file to generate a quiz.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Authentication failed. Please log in again.');
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('teacherId', teacherId);
      formData.append('model', 'gemini-1.5-flash-latest'); // As per user instruction

      const response = await fetch(
        'https://bvykyspbqcqscsgdvzjp.supabase.co/functions/v1/create-quiz-from-file',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            // The Gemini API key is passed securely to the edge function.
            // The function will retrieve it from its environment variables.
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate quiz.');
      }

      toast({
        title: 'Success!',
        description: `Quiz "${result.title}" has been generated successfully.`,
      });
      
      onQuizGenerated(result);
      setFile(null);
    } catch (error: any) {
      console.error('Error generating quiz:', error);
      toast({
        title: 'Generation Failed',
        description: error.message || 'An unknown error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-4 shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle>Generate Quiz with AI</CardTitle>
        <CardDescription>Upload a .docx or .pdf file to automatically generate a quiz.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          {...getRootProps()}
          className={`relative p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors bg-white/80
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
            <UploadCloud className="h-12 w-12" />
            <p className="font-semibold">{isDragActive ? 'Drop the file here...' : 'Drag & drop or click to upload'}</p>
            <p className="text-xs">Supported formats: DOCX, PDF</p>
          </div>
        </div>

        {file && (
          <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
            <div className="flex items-center gap-3 overflow-hidden">
              <FileText className="h-6 w-6 text-primary flex-shrink-0" />
              <span className="font-medium text-sm truncate" title={file.name}>{file.name}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={removeFile} disabled={isLoading} className="flex-shrink-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <Button onClick={handleGenerateQuiz} disabled={!file || isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Generating...' : 'Generate Quiz'}
        </Button>
      </CardContent>
    </Card>
  );
};
