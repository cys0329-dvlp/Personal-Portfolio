export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  problem: string;
  solution: string;
  techStack: string[];
  challenges: string;
  results: string;
  lessonsLearned: string;
  githubUrl?: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: "gesture-rc-car",
    title: "Gesture-Controlled RC Car",
    shortDescription: "Vision-based vehicle control using hand gestures.",
    problem: "Traditional controllers felt limiting. I wanted a more intuitive interaction model.",
    solution: "Developed a computer vision system that interprets hand gestures to control movement.",
    techStack: ["Python", "MediaPipe", "Arduino", "Computer Vision"],
    challenges: "Reducing latency and improving gesture recognition stability.",
    results: "Achieved responsive real-time control with reliable detection.",
    lessonsLearned: "Human input systems require careful noise handling and feedback design.",
    githubUrl: "https://github.com",
  },
  {
    id: "sensor-visualization",
    title: "Real-Time Sensor Visualization",
    shortDescription: "Live sensor data monitoring and visualization tool.",
    problem: "Raw sensor values were difficult to interpret during debugging.",
    solution: "Built a visualization interface for real-time motion and angle tracking.",
    techStack: ["Python", "MPU6050", "Data Processing"],
    challenges: "Noise filtering and stable data streaming.",
    results: "Improved debugging efficiency and system insight.",
    lessonsLearned: "Visual feedback significantly accelerates development cycles.",
    githubUrl: "https://github.com",
  }
];
