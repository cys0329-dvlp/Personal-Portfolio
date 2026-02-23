import { motion } from "motion/react";
import AnimatedPage from "../components/AnimatedPage";

const skills = [
  "Embedded Systems",
  "Python",
  "Computer Vision",
  "Robotics",
  "Web Development",
  "Problem Solving",
];

const interests = [
  "Intelligent Systems",
  "Human–Computer Interaction",
  "Automation",
  "Technical Creativity",
];

export default function About() {
  return (
    <AnimatedPage className="max-w-2xl space-y-16">
      <section className="space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-medium tracking-tight text-zinc-900"
        >
          About Me
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-zinc-600 leading-relaxed"
        >
          I enjoy building systems, exploring ideas, and understanding how things work beneath the surface.
          This space is a collection of my experiments, projects, and continuous learning journey.
        </motion.p>
      </section>

      <section className="space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl font-medium tracking-tight text-zinc-900"
        >
          Skills
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-3"
        >
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 text-sm font-medium bg-zinc-100 text-zinc-700 rounded-full border border-zinc-200/50"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </section>

      <section className="space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-2xl font-medium tracking-tight text-zinc-900"
        >
          Interests
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          {interests.map((interest) => (
            <span
              key={interest}
              className="px-4 py-2 text-sm font-medium bg-zinc-50 text-zinc-600 rounded-full border border-zinc-200/50"
            >
              {interest}
            </span>
          ))}
        </motion.div>
      </section>
    </AnimatedPage>
  );
}
