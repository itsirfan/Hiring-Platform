import React from 'react';
import { useApp } from '../context/AppContext';
import CandidateList from '../components/CandidateList';
import { CandidateStatus } from '../types';

export default function CandidatesPage() {
  const { state, dispatch } = useApp();

  const handleStatusChange = (id: string, status: CandidateStatus) => {
    const candidate = state.candidates.find((c) => c.id === id);
    if (candidate) {
      dispatch({
        type: 'UPDATE_CANDIDATE',
        payload: { ...candidate, status },
      });
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">All Candidates</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage all candidate applications across all job postings.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <CandidateList
          candidates={state.candidates}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}