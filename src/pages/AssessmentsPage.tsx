import React from 'react';
import { useApp } from '../context/AppContext';
import AssessmentForm from '../components/AssessmentForm';
import { Assessment } from '../types';

export default function AssessmentsPage() {
  const { state, dispatch } = useApp();

  const handleSaveAssessment = (
    assessment: Omit<Assessment, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    dispatch({
      type: 'ADD_ASSESSMENT',
      payload: {
        ...assessment,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Create Assessment
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Create job-specific assessments to evaluate candidates.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <AssessmentForm jobs={state.jobs} onSave={handleSaveAssessment} />
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Existing Assessments
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {state.assessments.map((assessment) => {
            const job = state.jobs.find((j) => j.id === assessment.jobId);
            return (
              <div
                key={assessment.id}
                className="bg-white shadow-sm rounded-lg p-6"
              >
                <h3 className="text-lg font-medium text-gray-900">
                  {assessment.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  For: {job?.title || 'Unknown Job'}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  {assessment.description}
                </p>
                <div className="mt-4">
                  <span className="text-sm text-gray-500">
                    {assessment.questions.length} questions
                  </span>
                  <span className="mx-2">•</span>
                  <span className="text-sm text-gray-500">
                    {assessment.timeLimit} minutes
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}