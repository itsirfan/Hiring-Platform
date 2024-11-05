import React, { createContext, useContext, useReducer } from 'react';
import { Job, Candidate, Assessment } from '../types';

interface AppState {
  jobs: Job[];
  candidates: Candidate[];
  assessments: Assessment[];
}

type Action =
  | { type: 'ADD_JOB'; payload: Job }
  | { type: 'UPDATE_JOB'; payload: Job }
  | { type: 'DELETE_JOB'; payload: string }
  | { type: 'ADD_CANDIDATE'; payload: Candidate }
  | { type: 'UPDATE_CANDIDATE'; payload: Candidate }
  | { type: 'ADD_ASSESSMENT'; payload: Assessment }
  | { type: 'UPDATE_ASSESSMENT'; payload: Assessment };

const sampleCandidates: Candidate[] = [
  {
    id: '1',
    jobId: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 123-4567',
    status: 'under_review',
    resumeUrl: 'https://example.com/resume/sarah.pdf',
    appliedAt: '2024-03-15T10:30:00Z',
    experience: 5,
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
  },
  {
    id: '2',
    jobId: '1',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    phone: '+1 (555) 234-5678',
    status: 'interview_scheduled',
    resumeUrl: 'https://example.com/resume/michael.pdf',
    appliedAt: '2024-03-14T15:45:00Z',
    experience: 3,
    skills: ['JavaScript', 'Vue.js', 'Python', 'Docker'],
  },
  {
    id: '3',
    jobId: '2',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    phone: '+1 (555) 345-6789',
    status: 'new',
    resumeUrl: 'https://example.com/resume/emily.pdf',
    appliedAt: '2024-03-16T09:15:00Z',
    experience: 2,
    skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'HTML/CSS'],
  },
  {
    id: '4',
    jobId: '2',
    name: 'David Kim',
    email: 'david.k@example.com',
    phone: '+1 (555) 456-7890',
    status: 'offer_sent',
    resumeUrl: 'https://example.com/resume/david.pdf',
    appliedAt: '2024-03-13T11:20:00Z',
    experience: 7,
    skills: ['Product Management', 'Agile', 'Data Analysis', 'Jira'],
  },
  {
    id: '5',
    jobId: '3',
    name: 'Lisa Thompson',
    email: 'lisa.t@example.com',
    phone: '+1 (555) 567-8901',
    status: 'hired',
    resumeUrl: 'https://example.com/resume/lisa.pdf',
    appliedAt: '2024-03-12T14:10:00Z',
    experience: 4,
    skills: ['Marketing Strategy', 'SEO', 'Content Writing', 'Analytics'],
  }
];

const initialState: AppState = {
  jobs: [],
  candidates: sampleCandidates,
  assessments: [],
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_JOB':
      return { ...state, jobs: [...state.jobs, action.payload] };
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job.id === action.payload.id ? action.payload : job
        ),
      };
    case 'DELETE_JOB':
      return {
        ...state,
        jobs: state.jobs.filter((job) => job.id !== action.payload),
      };
    case 'ADD_CANDIDATE':
      return {
        ...state,
        candidates: [...state.candidates, action.payload],
      };
    case 'UPDATE_CANDIDATE':
      return {
        ...state,
        candidates: state.candidates.map((candidate) =>
          candidate.id === action.payload.id ? action.payload : candidate
        ),
      };
    case 'ADD_ASSESSMENT':
      return {
        ...state,
        assessments: [...state.assessments, action.payload],
      };
    case 'UPDATE_ASSESSMENT':
      return {
        ...state,
        assessments: state.assessments.map((assessment) =>
          assessment.id === action.payload.id ? action.payload : assessment
        ),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}