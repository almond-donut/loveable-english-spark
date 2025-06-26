import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { Plus, FileText, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Type definition for a single question
interface Question {
  id: string;
  quiz_id: string;
  question_text: string;
  options: { A: string; B: string; C: string; D: string }; // This is the object used in the form
  option_a: string; // Individual fields for Supabase
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at?: string;
}

// Props for the QuestionManager component
export interface QuestionManagerProps {
  quizId: string;
  onBack: () => void;
  teacherId: string; // Added teacherId
}

export const QuestionManager: React.FC<QuestionManagerProps> = ({ quizId, onBack, teacherId }) => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // State for the question being edited or deleted
  const [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(null);

  // Form state for creating/editing questions
  const [questionForm, setQuestionForm] = useState({
    question_text: '',
    options: { A: '', B: '', C: '', D: '' },
    correct_answer: 'A' as 'A' | 'B' | 'C' | 'D',
    explanation: '',
    points: 10,
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
  });

  const resetForm = () => {
    setQuestionForm({
      question_text: '',
      options: { A: '', B: '', C: '', D: '' },
      correct_answer: 'A',
      explanation: '',
      points: 10,
      difficulty: 'medium',
    });
  };

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('quiz_id', quizId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedQuestions: Question[] = data.map((q: any) => ({
        ...q,
        explanation: q.explanation || '',
        difficulty: q.difficulty || 'medium',
        options: { A: q.option_a, B: q.option_b, C: q.option_c, D: q.option_d } // Map individual options back to an object for the form
      }));

      setQuestions(formattedQuestions);
    } catch (err: any) {
      console.error('Error fetching questions:', err);
      setError('Gagal memuat soal. Silakan coba lagi.');
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }, [quizId, toast]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('option_')) {
      const optionKey = name.split('_')[1].toUpperCase();
      setQuestionForm(prev => ({
        ...prev,
        options: { ...prev.options, [optionKey]: value },
      }));
    } else {
      setQuestionForm(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSelectChange = (value: string, fieldName: 'correct_answer' | 'difficulty') => {
    setQuestionForm(prev => ({ ...prev, [fieldName]: value as any }));
  };

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { options, ...rest } = questionForm;
      const { data, error } = await supabase
        .from('questions')
        .insert([{ 
          quiz_id: quizId, 
          ...rest, 
          option_a: options.A, 
          option_b: options.B, 
          option_c: options.C, 
          option_d: options.D,
          points: Number(questionForm.points) 
        }])
        .select();

      if (error) throw error;

      if (data) {
        fetchQuestions();
        toast({ title: 'Sukses!', description: 'Soal baru berhasil ditambahkan.' });
        setIsCreateDialogOpen(false);
        resetForm();
      }
    } catch (err: any) {
      console.error('Error creating question:', err);
      toast({ title: 'Error', description: 'Gagal membuat soal baru.', variant: 'destructive' });
    }
  };

  const handleEditClick = (question: Question) => {
    setQuestionToEdit(question);
    setQuestionForm({
      question_text: question.question_text,
      options: { A: question.option_a, B: question.option_b, C: question.option_c, D: question.option_d }, // Populate options object from individual fields
      correct_answer: question.correct_answer,
      explanation: question.explanation,
      points: question.points,
      difficulty: question.difficulty,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionToEdit) return;

    try {
      const { options, ...rest } = questionForm;
      const { data, error } = await supabase
        .from('questions')
        .update({ 
          ...rest, 
          option_a: options.A, 
          option_b: options.B, 
          option_c: options.C, 
          option_d: options.D,
          points: Number(questionForm.points) 
        })
        .eq('id', questionToEdit.id)
        .select();

      if (error) throw error;

      if (data) {
        fetchQuestions();
        toast({ title: 'Sukses!', description: 'Soal berhasil diperbarui.' });
        setIsEditDialogOpen(false);
        setQuestionToEdit(null);
        resetForm();
      }
    } catch (err: any) {
      console.error('Error updating question:', err);
      toast({ title: 'Error', description: 'Gagal memperbarui soal.', variant: 'destructive' });
    }
  };

  const handleDeleteClick = (question: Question) => {
    setQuestionToDelete(question);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!questionToDelete) return;
    try {
      const { error } = await supabase.from('questions').delete().eq('id', questionToDelete.id);
      if (error) throw error;
      fetchQuestions();
      toast({ title: 'Sukses!', description: 'Soal berhasil dihapus.' });
      setIsDeleteDialogOpen(false);
      setQuestionToDelete(null);
    } catch (err: any) {
      console.error('Error deleting question:', err);
      toast({ title: 'Error', description: 'Gagal menghapus soal.', variant: 'destructive' });
    }
  };

  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500 text-white';
      case 'medium': return 'bg-orange-500 text-white';
      case 'hard': return 'bg-red-500 text-white';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderQuestionForm = (handleSubmit: (e: React.FormEvent) => Promise<void>, onCancel: () => void) => (
    <form onSubmit={handleSubmit} className="space-y-6 p-1">
      <div>
        <Label htmlFor="question_text">Pertanyaan *</Label>
        <Textarea id="question_text" name="question_text" value={questionForm.question_text} onChange={handleFormChange} placeholder="Tulis pertanyaan di sini..." required rows={3} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(questionForm.options).map(key => (
          <div key={key}>
            <Label htmlFor={`option_${key.toLowerCase()}`}>Pilihan {key} *</Label>
            <Input id={`option_${key.toLowerCase()}`} name={`option_${key}`} value={questionForm.options[key as keyof typeof questionForm.options]} onChange={handleFormChange} placeholder={`Pilihan ${key}`} required />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="correct_answer">Jawaban Benar *</Label>
          <Select value={questionForm.correct_answer} onValueChange={(value) => handleSelectChange(value, 'correct_answer')}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="C">C</SelectItem>
              <SelectItem value="D">D</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="points">Poin *</Label>
          <Input id="points" name="points" type="number" value={questionForm.points} onChange={handleFormChange} required />
        </div>
        <div>
          <Label htmlFor="difficulty">Difficulty *</Label>
          <Select value={questionForm.difficulty} onValueChange={(value) => handleSelectChange(value, 'difficulty')}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Batal</Button>
        <Button type="submit">Simpan Soal</Button>
      </div>
    </form>
  );

  if (isLoading) return <div className="flex items-center justify-center h-64"><p>Loading questions...</p></div>;
  if (error) return <div className="flex items-center justify-center h-64"><p className="text-red-500">Error: {error}</p></div>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
               <Button variant="outline" size="icon" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <CardTitle>Manajemen Soal</CardTitle>
                <CardDescription>Tambah, edit, atau hapus soal untuk kuis ini.</CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => { resetForm(); setIsCreateDialogOpen(true); }}>
                <Plus className="mr-2 h-4 w-4" /> Tambah Soal
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {questions.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <p>Belum ada soal.</p>
                <p>Silakan tambahkan soal pertama Anda.</p>
              </div>
            ) : (
              questions.map((q, index) => (
                <div key={q.id} className="border p-4 rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-lg flex-1">{index + 1}. {q.question_text}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="px-3 py-1 text-sm font-semibold">
                        Poin: {q.points}
                      </Badge>
                      <Badge className={`${getDifficultyColor(q.difficulty)} px-3 py-1 text-sm font-semibold`}>
                        {q.difficulty}
                      </Badge>
                      <Button variant="ghost" size="icon" onClick={() => handleEditClick(q)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(q)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.entries(q.options).map(([key, value]) => (
                      <div key={key} className={`p-2 border rounded-md text-sm ${key === q.correct_answer ? 'bg-green-100 border-green-500' : 'bg-gray-50'}`}>
                        <span className="font-bold">{key}.</span> {value}
                      </div>
                    ))}
                  </div>
                  {q.explanation && (
                    <div className="text-sm text-gray-600 pt-2">
                      <p className="italic"><span className="font-semibold">Penjelasan:</span> {q.explanation}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create Question Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Tambah Soal Baru</DialogTitle></DialogHeader>
          {renderQuestionForm(handleCreateQuestion, () => setIsCreateDialogOpen(false))}
        </DialogContent>
      </Dialog>

      {/* Edit Question Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Soal</DialogTitle></DialogHeader>
          {renderQuestionForm(handleUpdateQuestion, () => setIsEditDialogOpen(false))}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>Tindakan ini tidak dapat dibatalkan. Soal akan dihapus secara permanen.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
