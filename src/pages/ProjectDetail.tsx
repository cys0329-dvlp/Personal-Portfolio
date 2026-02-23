import { motion } from "motion/react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import { useData } from "../context/DataContext";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { projects } = useData();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const sections = [
    { title: "Problem / Motivation", content: project.problem },
    { title: "Solution / Approach", content: project.solution },
    { title: "Challenges", content: project.challenges },
    { title: "Results", content: project.results },
    { title: "Lessons Learned", content: project.lessonsLearned },
  ];

  return (
    <AnimatedPage className="max-w-3xl space-y-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to projects
        </Link>
      </motion.div>

      <section className="space-y-8 border-b border-zinc-200/50 pb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-medium tracking-tight text-zinc-900"
        >
          {project.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-zinc-600 leading-relaxed max-w-2xl"
        >
          {project.shortDescription}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-2 pt-4"
        >
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 text-sm font-medium bg-zinc-100 text-zinc-700 rounded-md"
            >
              {tech}
            </span>
          ))}
        </motion.div>
        {(project.githubUrl || project.demoUrl) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-4 pt-4"
          >
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
          </motion.div>
        )}
      </section>

      <section className="space-y-16">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-medium tracking-tight text-zinc-900">
              {section.title}
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </p>
          </motion.div>
        ))}
      </section>
    </AnimatedPage>
  );
}
