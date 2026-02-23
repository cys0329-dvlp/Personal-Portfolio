import React, { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import { useData } from "../context/DataContext";
import ProjectFormModal from "../components/ProjectFormModal";
import { Project } from "../data/projects";

export default function Projects() {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleSave = (project: Project) => {
    if (editingProject) {
      updateProject(project);
    } else {
      addProject(project);
    }
  };

  const handleEdit = (e: React.MouseEvent, project: Project) => {
    e.preventDefault();
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
    }
  };

  const openNewModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  return (
    <AnimatedPage className="space-y-16">
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 max-w-2xl">
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-medium tracking-tight text-zinc-900"
          >
            Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-zinc-600 leading-relaxed"
          >
            A collection of my technical explorations, experiments, and completed systems.
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
          Add Project
        </motion.button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            className="relative group"
          >
            <Link
              to={`/projects/${project.id}`}
              className="block p-8 bg-white border border-zinc-200 rounded-2xl hover:border-zinc-300 hover:shadow-sm transition-all h-full flex flex-col"
            >
              <div className="space-y-4 flex-1">
                <h3 className="text-xl font-medium group-hover:text-zinc-600 transition-colors pr-16">
                  {project.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  {project.shortDescription}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-8 mt-auto">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-medium bg-zinc-100 text-zinc-600 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
            
            <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => handleEdit(e, project)}
                className="p-2 bg-white border border-zinc-200 text-zinc-500 hover:text-zinc-900 rounded-full shadow-sm hover:border-zinc-300 transition-all"
                title="Edit Project"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => handleDelete(e, project.id)}
                className="p-2 bg-white border border-zinc-200 text-red-500 hover:text-red-600 rounded-full shadow-sm hover:border-red-200 transition-all"
                title="Delete Project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingProject}
      />
    </AnimatedPage>
  );
}
