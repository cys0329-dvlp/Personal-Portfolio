import React, { useState } from "react";
import { motion } from "motion/react";
import AnimatedPage from "../components/AnimatedPage";
import { ArrowRight, Plus, Pencil, Trash2 } from "lucide-react";
import { useData, StudyItem } from "../context/DataContext";
import StudyFormModal from "../components/StudyFormModal";

export default function Study() {
  const { studyItems, addStudyItem, updateStudyItem, deleteStudyItem } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StudyItem | null>(null);

  const handleSave = (item: StudyItem) => {
    if (editingItem) {
      updateStudyItem(item);
    } else {
      addStudyItem(item);
    }
  };

  const handleEdit = (e: React.MouseEvent, item: StudyItem) => {
    e.preventDefault();
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteStudyItem(id);
    }
  };

  const openNewModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  return (
    <AnimatedPage className="max-w-2xl space-y-16">
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-medium tracking-tight text-zinc-900"
          >
            Study & Notes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-zinc-600 leading-relaxed"
          >
            A structured record of concepts, experiments, and technical reflections.
          </motion.p>
        </div>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={openNewModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors whitespace-nowrap self-start"
        >
          <Plus className="w-4 h-4" />
          Add Note
        </motion.button>
      </section>

      <section className="space-y-8">
        {studyItems.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="group relative flex flex-col items-start justify-between py-6 border-b border-zinc-200/50 last:border-0"
          >
            <div className="flex items-center gap-4 text-sm text-zinc-500 mb-2">
              <time dateTime={item.date}>{item.date}</time>
            </div>
            <h2 className="text-xl font-medium tracking-tight text-zinc-900 group-hover:text-zinc-600 transition-colors pr-16">
              {item.title}
            </h2>
            <p className="mt-2 text-zinc-600 leading-relaxed whitespace-pre-wrap">
              {item.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-zinc-500 group-hover:text-zinc-900 transition-colors cursor-pointer">
              Read notes
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>

            <div className="absolute top-6 right-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => handleEdit(e, item)}
                className="p-2 bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 rounded-full shadow-sm hover:border-zinc-300 transition-all"
                title="Edit Note"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => handleDelete(e, item.id)}
                className="p-2 bg-white border border-zinc-200 text-red-500 hover:text-red-600 rounded-full shadow-sm hover:border-red-200 transition-all"
                title="Delete Note"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.article>
        ))}
      </section>

      <StudyFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingItem}
      />
    </AnimatedPage>
  );
}
