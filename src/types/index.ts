export type JobStatus = 'active' | 'archived' | 'draft';
export type CandidateStatus = 'new' | 'under_review' | 'interview_scheduled' | 'offer_sent' | 'rejected' | 'hired';

export interface Job {
  id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  type: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Candidate {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  status: CandidateStatus;
  resumeUrl: string;
  appliedAt: string;
  experience: number;
  skills: string[];
}

export interface Question {
  id: string;
  jobId: string;
  question: string;
  options: string[];
  correctOption: number;
}

export interface Assessment {
  id: string;
  jobId: string;
  title: string;
  description: string;
  timeLimit: number;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}