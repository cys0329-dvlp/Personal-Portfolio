import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import { useData } from "../context/DataContext";

export default function Home() {
  const { projects } = useData();
  const featuredProjects = projects.slice(0, 2);

  return (
    <AnimatedPage className="space-y-24">
      <section className="space-y-6 max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900"
        >
          Building, Experimenting, Learning.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-zinc-600 leading-relaxed"
        >
          A personal archive of projects, ideas, and technical explorations.
          I enjoy building systems, exploring ideas, and understanding how things work beneath the surface.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-4"
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors group"
          >
            More about me
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      <section className="space-y-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium tracking-tight">Featured Projects</h2>
          <Link
            to="/projects"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Link
                to={`/projects/${project.id}`}
                className="group block p-6 bg-white border border-zinc-200 rounded-2xl hover:border-zinc-300 hover:shadow-sm transition-all"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-medium group-hover:text-zinc-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-600 line-clamp-2">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-medium bg-zinc-100 text-zinc-600 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </AnimatedPage>
  );
}
