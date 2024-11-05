import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Clock } from 'lucide-react';
import { Job } from '../types';
import { useApp } from '../context/AppContext';

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}

export default function JobCard({ job, onEdit, onDelete }: JobCardProps) {
  const { state } = useApp();
  const candidateCount = state.candidates.filter(
    (candidate) => candidate.jobId === job.id
  ).length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
            <span className="flex items-center">
              <MapPin className="mr-1.5 h-4 w-4" />
              {job.location}
            </span>
            <span className="flex items-center">
              <Clock className="mr-1.5 h-4 w-4" />
              {job.type}
            </span>
            <span className="flex items-center">
              <Users className="mr-1.5 h-4 w-4" />
              {candidateCount} candidates
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(job)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="text-sm font-medium text-red-600 hover:text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600 line-clamp-2">
        {job.description}
      </p>
      <div className="mt-4 flex justify-between items-center">
        <Link
          to={`/jobs/${job.id}/candidates`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          View Candidates →
        </Link>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            job.status === 'active'
              ? 'bg-green-100 text-green-800'
              : job.status === 'archived'
              ? 'bg-gray-100 text-gray-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>
    </div>
  );
}