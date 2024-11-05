import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Assessment, Question, Job } from '../types';

interface AssessmentFormProps {
  jobs: Job[];
  onSave: (assessment: Omit<Assessment, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export default function AssessmentForm({ jobs, onSave }: AssessmentFormProps) {
  const [selectedJobId, setSelectedJobId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(30);
  const [questions, setQuestions] = useState<Omit<Question, 'id' | 'jobId'>[]>([]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctOption: 0,
      },
    ]);
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], [field]: value };
    setQuestions(newQuestions);
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      jobId: selectedJobId,
      title,
      description,
      timeLimit,
      questions: questions as Question[],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="job"
              className="block text-sm font-medium text-gray-700"
            >
              Select Job
            </label>
            <select
              id="job"
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select a job...</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Assessment Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="timeLimit"
              className="block text-sm font-medium text-gray-700"
            >
              Time Limit (minutes)
            </label>
            <input
              type="number"
              id="timeLimit"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Questions</h3>
            <button
              type="button"
              onClick={handleAddQuestion}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </button>
          </div>

          {questions.map((question, qIndex) => (
            <div key={qIndex} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Question {qIndex + 1}
                  </label>
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, 'question', e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setQuestions(questions.filter((_, i) => i !== qIndex))
                  }
                  className="ml-4 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-2">
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={question.correctOption === oIndex}
                      onChange={() =>
                        handleQuestionChange(qIndex, 'correctOption', oIndex)
                      }
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(qIndex, oIndex, e.target.value)
                      }
                      placeholder={`Option ${oIndex + 1}`}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Assessment
        </button>
      </div>
    </form>
  );
}