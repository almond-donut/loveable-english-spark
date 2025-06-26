import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
<<<<<<< HEAD
import { Plus, FileText, CheckCircle, XCircle, Edit, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { CreateQuestionForm } from './CreateQuestionForm';
=======
import { Plus, FileText, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450

// Type definition for a single question
interface Question {
  id: string;
  quiz_id: string;
  question_text: string;
<<<<<<< HEAD
  options: Record<string, string>;
=======
  options: { A: string; B: string; C: string; D: string }; // This is the object used in the form
  option_a: string; // Individual fields for Supabase
  option_b: string;
  option_c: string;
  option_d: string;
>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450
  correct_answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  points: number;
<<<<<<< HEAD
  question_order: number;
  created_at: string;
  difficulty: 'easy' | 'medium' | 'hard'; // Add difficulty to Question interface
=======
  difficulty: 'easy' | 'medium' | 'hard';
  created_at?: string;
>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450
}

// Props for the QuestionManager component
export interface QuestionManagerProps {
  quizId: string;
  onBack: () => void;
  teacherId: string; // Added teacherId
}

<<<<<<< HEAD
export function QuestionManager({ quizId, quizTitle, onClose, onBack }: QuestionManagerProps) {
  const { profileId } = useAuth();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateQuestionDialogOpen, setIsCreateQuestionDialogOpen] = useState(false); // Renamed state
=======
export const QuestionManager: React.FC<QuestionManagerProps> = ({ quizId, onBack, teacherId }) => {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450
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
<<<<<<< HEAD
    points: 0, // Default to 0, will be set by CreateQuestionForm
    difficulty: 'medium' as 'easy' | 'medium' | 'hard', // Add difficulty to form state
  });

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      console.log('🔍 Fetching questions for quiz:', quizId);
      
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('quiz_id', quizId)
        .order('question_order', { ascending: true });

      if (error) throw error;
        console.log('📝 Quiz questions:', data);
        console.log('Fetched questions data:', data); // Added console.log statement
      setQuestions((data || []) as any as Question[]);
    } catch (error: any) {
      console.error('❌ Fetch questions error:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch questions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

=======
    points: 10,
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
  });

>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450
  const resetForm = () => {
    setQuestionForm({
      question_text: '',
      options: { A: '', B: '', C: '', D: '' },
      correct_answer: 'A',
      explanation: '',
<<<<<<< HEAD
      points: 0,
=======
      points: 10,
>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450
      difficulty: 'medium',
    });
  };

<<<<<<< HEAD
  const handleCreateQuestion = async (
    questionName: string,
    difficulty: 'easy' | 'medium' | 'hard',
    points: number,
    options: string[],
    correctIndex: number
  ) => {
    try {
      console.log('📝 Creating question with new format:', { questionName, difficulty, points, options, correctIndex });
      
      const nextOrderNumber = questions.length + 1;

      // Build the new 'options' JSON object
      const optionsObject = {
        'A': options[0] || '',
        'B': options[1] || '',
        'C': options[2] || '',
        'D': options[3] || '',
      };
      
      const { data, error } = await supabase
        .from('questions')
        .insert({
          quiz_id: quizId,
          question_text: questionName,
          options: optionsObject, // Use the new JSON format
          correct_answer: String.fromCharCode(65 + correctIndex) as 'A' | 'B' | 'C' | 'D',
          explanation: '',
          points: points,
          question_order: nextOrderNumber,
          difficulty: difficulty,
        })
        .select()
        .single();
=======
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
>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450

      if (error) throw error;

<<<<<<< HEAD
      setIsCreateQuestionDialogOpen(false);
      fetchQuestions();
    } catch (error: any) {
      console.error('❌ Create question error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create question',
        variant: 'destructive',
      });
    }
  };

  const handleEditQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentQuestion) return;
    
    try {
      console.log('✏️ Updating question:', currentQuestion.id, questionForm);
      
      // Build the new 'options' JSON object from the form state
      const optionsObject = {
        'A': questionForm.option_a,
        'B': questionForm.option_b,
        'C': questionForm.option_c,
        'D': questionForm.option_d,
      };

      const { data, error } = await supabase
        .from('questions')
        .update({
          question_text: questionForm.question_text,
          options: optionsObject, // Use the new JSON format
          correct_answer: questionForm.correct_answer,
          explanation: questionForm.explanation,
          points: questionForm.points,
          difficulty: questionForm.difficulty,
        })
        .eq('id', currentQuestion.id)
        .select()
        .single();
 
      if (error) throw error;
      
      console.log('✅ Question updated successfully:', data);
      
      toast({
        title: 'Success',
        description: 'Soal berhasil diperbarui!',
      });
 
      setIsEditDialogOpen(false);
      setCurrentQuestion(null);
      resetForm();
      fetchQuestions();
    } catch (error: any) {
      console.error('❌ Update question error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update question',
        variant: 'destructive',
      });
    }
  };
 
  const handleDeleteQuestion = async () => {
    if (!questionToDelete) return;
    
    try {
      console.log('🗑️ Deleting question:', questionToDelete.id);
      
      const { error } = await supabase
        .from('questions')
        .delete()
        .eq('id', questionToDelete.id);
 
      if (error) throw error;
      
      console.log('✅ Question deleted successfully');
      
      toast({
        title: 'Success',
        description: 'Soal berhasil dihapus!',
      });
 
      setIsDeleteConfirmOpen(false);
      setQuestionToDelete(null);
      fetchQuestions();
    } catch (error: any) {
      console.error('❌ Delete question error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete question',
        variant: 'destructive',
      });
    }
  };
 
  const openEditDialog = (question: Question) => {
    setCurrentQuestion(question);
    // Populate form from the 'options' object for consistency
    setQuestionForm({
      question_text: question.question_text,
      option_a: question.options?.A || '',
      option_b: question.options?.B || '',
      option_c: question.options?.C || '',
      option_d: question.options?.D || '',
=======
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
>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450
      correct_answer: question.correct_answer,
      explanation: question.explanation,
      points: question.points,
      difficulty: question.difficulty,
    });
    setIsEditDialogOpen(true);
  };
<<<<<<< HEAD
 
  const openDeleteDialog = (question: Question) => {
=======

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
>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450
    setQuestionToDelete(question);
    setIsDeleteDialogOpen(true);
  };
<<<<<<< HEAD
 
  const getDifficultyColor = (answer: string, correct: string) => {
    return answer === correct ? 'bg-green-100 border-green-500 text-green-700' : 'bg-gray-50 border-gray-200';
  };
 
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Question Management</h2>
          <p className="text-muted-foreground">
            Kelola soal untuk quiz: <span className="font-semibold">{quizTitle}</span>
          </p>
        </div>        <div className="flex gap-2">
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              ← Back to Quizzes
            </Button>
          )}
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
          <Dialog open={isCreateQuestionDialogOpen} onOpenChange={setIsCreateQuestionDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsCreateQuestionDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Soal
              </Button>
            </DialogTrigger>
            <CreateQuestionForm
              isOpen={isCreateQuestionDialogOpen}
              onClose={() => setIsCreateQuestionDialogOpen(false)}
              onCreateQuestion={(questionName, difficulty, points, options, correctIndex) =>
                handleCreateQuestion(questionName, difficulty, points, options, correctIndex)
              }
            />
          </Dialog>
          
          <Button variant="outline" onClick={onClose}>
            Kembali ke Quiz
          </Button>
        </div>
      </div>
 
      {loading ? (
        <div className="text-center py-8">Loading questions...</div>
      ) : questions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Belum ada soal</h3>
            <p className="text-muted-foreground mb-4">
              Mulai buat soal pertama untuk quiz ini. Gunakan template yang sudah disediakan!
            </p>
            <Button onClick={() => setIsCreateQuestionDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Tambah Soal Pertama
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {questions.map((question, index) => (
            <Card key={question.id} className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Soal #{index + 1}</Badge>
                    <Badge variant="outline">{question.points} poin</Badge>
                    <Badge variant="outline" className="capitalize">{question.difficulty}</Badge>
=======

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
>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
<<<<<<< HEAD
                    {question.options && Object.keys(question.options).length > 0 && Object.values(question.options).some(v => v) ? (
                      Object.entries(question.options).map(([key, value]) => (
                        <div key={key} className={`p-2 rounded border ${getDifficultyColor(key, question.correct_answer)}`}>
                          <span className="font-medium">{key}. </span>{value}
                          {question.correct_answer === key && <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />}
                        </div>
                      ))
                    ) : (
                      <div className="col-span-1 md:col-span-2 text-sm text-muted-foreground italic p-2 bg-gray-50 rounded-md">
                        Pilihan jawaban tidak tersedia untuk soal ini. Silakan klik tombol 'Edit' untuk menambahkan pilihan jawaban.
                      </div>
                    )}
=======
                    {Object.entries(q.options).map(([key, value]) => (
                      <div key={key} className={`p-2 border rounded-md text-sm ${key === q.correct_answer ? 'bg-green-100 border-green-500' : 'bg-gray-50'}`}>
                        <span className="font-bold">{key}.</span> {value}
                      </div>
                    ))}
>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450
                  </div>
                  {q.explanation && (
                    <div className="text-sm text-gray-600 pt-2">
                      <p className="italic"><span className="font-semibold">Penjelasan:</span> {q.explanation}</p>
                    </div>
                  )}
                </div>
<<<<<<< HEAD
                
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(question)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDeleteDialog(question)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
 
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Soal</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleEditQuestion} className="space-y-4">
            <div>
              <Label htmlFor="edit_question_text">Pertanyaan *</Label>
              <Textarea
                id="edit_question_text"
                value={questionForm.question_text}
                onChange={(e) => setQuestionForm({ ...questionForm, question_text: e.target.value })}
                placeholder="Tulis pertanyaan di sini..."
                required
                rows={3}
              />
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit_option_a">Pilihan A *</Label>
                <Input
                  id="edit_option_a"
                  value={questionForm.option_a}
                  onChange={(e) => setQuestionForm({ ...questionForm, option_a: e.target.value })}
                  placeholder="Pilihan A"
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit_option_b">Pilihan B *</Label>
                <Input
                  id="edit_option_b"
                  value={questionForm.option_b}
                  onChange={(e) => setQuestionForm({ ...questionForm, option_b: e.target.value })}
                  placeholder="Pilihan B"
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit_option_c">Pilihan C *</Label>
                <Input
                  id="edit_option_c"
                  value={questionForm.option_c}
                  onChange={(e) => setQuestionForm({ ...questionForm, option_c: e.target.value })}
                  placeholder="Pilihan C"
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit_option_d">Pilihan D *</Label>
                <Input
                  id="edit_option_d"
                  value={questionForm.option_d}
                  onChange={(e) => setQuestionForm({ ...questionForm, option_d: e.target.value })}
                  placeholder="Pilihan D"
                  required
                />
              </div>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit_correct_answer">Jawaban Benar *</Label>
                <Select value={questionForm.correct_answer} onValueChange={(value: 'A' | 'B' | 'C' | 'D') => setQuestionForm({ ...questionForm, correct_answer: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jawaban benar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit_points">Poin</Label>
                <Input
                  id="edit_points"
                  type="number"
                  min="1"
                  max="100"
                  value={questionForm.points}
                  onChange={(e) => setQuestionForm({ ...questionForm, points: parseInt(e.target.value) || 10 })}
                />
              </div>
            </div>
 
            <div>
              <Label htmlFor="edit_explanation">Penjelasan (Opsional)</Label>
              <Textarea
                id="edit_explanation"
                value={questionForm.explanation}
                onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                placeholder="Jelaskan mengapa jawaban ini benar..."
                rows={2}
              />
            </div>
 
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit">
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
 
      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
=======
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
>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450
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
