import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import JobCard from '../components/JobCard';
import { Job } from '../types';

export default function Dashboard() {
  const { state, dispatch } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const handleSaveJob = (job: Job) => {
    if (editingJob) {
      dispatch({ type: 'UPDATE_JOB', payload: job });
    } else {
      dispatch({
        type: 'ADD_JOB',
        payload: {
          ...job,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    }
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const handleDeleteJob = (id: string) => {
    if (confirm('Are you sure you want to delete this job?')) {
      dispatch({ type: 'DELETE_JOB', payload: id });
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Job Postings</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage all your job postings and track candidate applications.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Job
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {state.jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onEdit={(job) => {
              setEditingJob(job);
              setIsModalOpen(true);
            }}
            onDelete={handleDeleteJob}
          />
        ))}
      </div>

      {/* Job Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {editingJob ? 'Edit Job' : 'Add New Job'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const job = {
                  id: editingJob?.id || '',
                  title: formData.get('title') as string,
                  description: formData.get('description') as string,
                  department: formData.get('department') as string,
                  location: formData.get('location') as string,
                  type: formData.get('type') as string,
                  status: formData.get('status') as 'active' | 'archived' | 'draft',
                  createdAt: editingJob?.createdAt || new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                };
                handleSaveJob(job);
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={editingJob?.title}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                  name="description"
                  id="description"
                  rows={3}
                  defaultValue={editingJob?.description}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    id="department"
                    defaultValue={editingJob?.department}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    defaultValue={editingJob?.location}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Type
                  </label>
                  <select
                    name="type"
                    id="type"
                    defaultValue={editingJob?.type || 'full-time'}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <select
                    name="status"
                    id="status"
                    defaultValue={editingJob?.status || 'draft'}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingJob(null);
                  }}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {editingJob ? 'Save Changes' : 'Create Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}