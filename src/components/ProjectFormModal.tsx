import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  initialData?: Project | null;
}

export default function ProjectFormModal({ isOpen, onClose, onSave, initialData }: ProjectFormModalProps) {
  const [formData, setFormData] = useState<Partial<Project>>({
    id: '',
    title: '',
    shortDescription: '',
    problem: '',
    solution: '',
    techStack: [],
    challenges: '',
    results: '',
    lessonsLearned: '',
    githubUrl: '',
    demoUrl: '',
  });

  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setTechInput(initialData.techStack.join(', '));
    } else {
      setFormData({
        id: '',
        title: '',
        shortDescription: '',
        problem: '',
        solution: '',
        techStack: [],
        challenges: '',
        results: '',
        lessonsLearned: '',
        githubUrl: '',
        demoUrl: '',
      });
      setTechInput('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const techStack = techInput.split(',').map(t => t.trim()).filter(Boolean);
    const id = formData.id || formData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || Date.now().toString();
    
    onSave({
      ...(formData as Project),
      id,
      techStack,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-zinc-100">
            <h2 className="text-xl font-medium text-zinc-900">
              {initialData ? 'Edit Project' : 'New Project'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Title</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Short Description</label>
                  <input
                    required
                    type="text"
                    value={formData.shortDescription}
                    onChange={e => setFormData({ ...formData, shortDescription: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    placeholder="React, Tailwind, Node.js"
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Problem / Motivation</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.problem}
                    onChange={e => setFormData({ ...formData, problem: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Solution / Approach</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.solution}
                    onChange={e => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Challenges</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.challenges}
                    onChange={e => setFormData({ ...formData, challenges: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Results</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.results}
                    onChange={e => setFormData({ ...formData, results: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Lessons Learned</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.lessonsLearned}
                    onChange={e => setFormData({ ...formData, lessonsLearned: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">GitHub URL (Optional)</label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Demo URL (Optional)</label>
                    <input
                      type="url"
                      value={formData.demoUrl}
                      onChange={e => setFormData({ ...formData, demoUrl: e.target.value })}
                      className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="p-6 border-t border-zinc-100 bg-zinc-50/50 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="project-form"
              className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Save Project
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
