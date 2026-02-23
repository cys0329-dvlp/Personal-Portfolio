import { motion } from "motion/react";
import AnimatedPage from "../components/AnimatedPage";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

const links = [
  {
    name: "Email",
    href: "mailto:hello@example.com",
    icon: Mail,
    label: "hello@example.com",
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: Github,
    label: "@username",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
    label: "in/username",
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: Twitter,
    label: "@username",
  },
];

export default function Contact() {
  return (
    <AnimatedPage className="max-w-2xl space-y-16">
      <section className="space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-medium tracking-tight text-zinc-900"
        >
          Contact
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-zinc-600 leading-relaxed"
        >
          For conversations, collaborations, or curiosity.
        </motion.p>
      </section>

      <section className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group flex items-center gap-4 p-6 bg-white border border-zinc-200 rounded-2xl hover:border-zinc-300 hover:shadow-sm transition-all"
              >
                <div className="p-3 bg-zinc-50 rounded-xl group-hover:bg-zinc-100 transition-colors">
                  <Icon className="w-6 h-6 text-zinc-600 group-hover:text-zinc-900 transition-colors" />
                </div>
                <div>
                  <h2 className="text-sm font-medium text-zinc-500 mb-1">
                    {link.name}
                  </h2>
                  <p className="text-zinc-900 font-medium group-hover:text-zinc-600 transition-colors">
                    {link.label}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>
    </AnimatedPage>
  );
}
