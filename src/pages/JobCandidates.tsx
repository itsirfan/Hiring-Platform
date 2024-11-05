import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CandidateList from '../components/CandidateList';
import { CandidateStatus } from '../types';

export default function JobCandidates() {
  const { jobId } = useParams<{ jobId: string }>();
  const { state, dispatch } = useApp();

  const job = state.jobs.find((j) => j.id === jobId);
  const candidates = state.candidates.filter((c) => c.jobId === jobId);

  const handleStatusChange = (id: string, status: CandidateStatus) => {
    const candidate = candidates.find((c) => c.id === id);
    if (candidate) {
      dispatch({
        type: 'UPDATE_CANDIDATE',
        payload: { ...candidate, status },
      });
    }
  };

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Jobs
        </Link>
      </div>

      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Candidates for {job.title}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage candidates who applied for this position.
          </p>
        </div>
      </div>

      <div className="mt-8">
        {candidates.length > 0 ? (
          <CandidateList
            candidates={candidates}
            onStatusChange={handleStatusChange}
          />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No candidates have applied yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}