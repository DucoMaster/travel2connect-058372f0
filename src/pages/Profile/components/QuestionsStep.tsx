
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types';
import { roleQuestions } from '@/data/roleQuestions';

interface QuestionsStepProps {
  userRole: UserRole | undefined;
  questionAnswers: string[];
  setQuestionAnswers: (answers: string[]) => void;
  onBack: () => void;
  onContinue: () => void;
}

const QuestionsStep: React.FC<QuestionsStepProps> = ({
  userRole,
  questionAnswers,
  setQuestionAnswers,
  onBack,
  onContinue,
}) => {
  const { toast } = useToast();
  const roleSpecificQuestions = userRole ? roleQuestions[userRole] : roleQuestions.traveler;

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...questionAnswers];
    newAnswers[index] = value;
    setQuestionAnswers(newAnswers);
  };

  const handleContinue = () => {
    // Ensure at least 3 questions are answered
    const answeredCount = questionAnswers.filter(a => a !== '').length;
    if (answeredCount < 3) {
      toast({
        title: 'More information needed',
        description: 'Please answer at least 3 questions.',
        variant: 'destructive',
      });
      return;
    }
    onContinue();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>About You</CardTitle>
        <CardDescription>Help us understand your preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {roleSpecificQuestions.map((q, index) => (
            <div key={index} className="space-y-2">
              <Label>{q.question}</Label>
              <RadioGroup 
                value={questionAnswers[index]} 
                onValueChange={(value) => handleAnswerChange(index, value)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((option, optIndex) => (
                    <div key={optIndex} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={option} 
                        id={`question-${index}-option-${optIndex}`} 
                      />
                      <Label 
                        htmlFor={`question-${index}-option-${optIndex}`}
                        className="cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <Button 
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          className="bg-travel-500 hover:bg-travel-600"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionsStep;
