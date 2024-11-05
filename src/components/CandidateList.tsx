import React from 'react';
import { FileText, Mail, Phone, Calendar } from 'lucide-react';
import { Candidate, CandidateStatus } from '../types';

interface CandidateListProps {
  candidates: Candidate[];
  onStatusChange: (id: string, status: CandidateStatus) => void;
}

const statusColors: Record<CandidateStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  under_review: 'bg-yellow-100 text-yellow-800',
  interview_scheduled: 'bg-purple-100 text-purple-800',
  offer_sent: 'bg-indigo-100 text-indigo-800',
  rejected: 'bg-red-100 text-red-800',
  hired: 'bg-green-100 text-green-800',
};

export default function CandidateList({
  candidates,
  onStatusChange,
}: CandidateListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
      {candidates.map((candidate) => (
        <div key={candidate.id} className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                {candidate.name}
              </h3>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Mail className="mr-1.5 h-4 w-4 flex-shrink-0" />
                  {candidate.email}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Phone className="mr-1.5 h-4 w-4 flex-shrink-0" />
                  {candidate.phone}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1.5 h-4 w-4 flex-shrink-0" />
                  Applied {new Date(candidate.appliedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex items-center space-x-4">
              <select
                value={candidate.status}
                onChange={(e) =>
                  onStatusChange(candidate.id, e.target.value as CandidateStatus)
                }
                className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {Object.keys(statusColors).map((status) => (
                  <option key={status} value={status}>
                    {status.split('_').map(capitalize).join(' ')}
                  </option>
                ))}
              </select>
              <a
                href={candidate.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FileText className="mr-2 h-4 w-4" />
                Resume
              </a>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex space-x-2 flex-wrap">
              {candidate.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}