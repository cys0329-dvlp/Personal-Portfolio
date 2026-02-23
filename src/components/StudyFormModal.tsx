import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { StudyItem } from '../context/DataContext';

interface StudyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: StudyItem) => void;
  initialData?: StudyItem | null;
}

export default function StudyFormModal({ isOpen, onClose, onSave, initialData }: StudyFormModalProps) {
  const [formData, setFormData] = useState<Partial<StudyItem>>({
    id: '',
    title: '',
    date: '',
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        id: '',
        title: '',
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        description: '',
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = formData.id || Date.now().toString();
    
    onSave({
      ...(formData as StudyItem),
      id,
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
          className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-zinc-100">
            <h2 className="text-xl font-medium text-zinc-900">
              {initialData ? 'Edit Note' : 'New Note'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <form id="study-form" onSubmit={handleSubmit} className="space-y-6">
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
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Date</label>
                  <input
                    required
                    type="text"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. Oct 2023"
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-shadow resize-none"
                  />
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
              form="study-form"
              className="px-4 py-2 text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Save Note
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
