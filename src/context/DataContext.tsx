import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, projects as defaultProjects } from '../data/projects';

export interface StudyItem {
  id: string;
  title: string;
  date: string;
  description: string;
}

const defaultStudyItems: StudyItem[] = [
  {
    id: "1",
    title: "Understanding Sensor Noise",
    date: "Oct 2023",
    description: "Deep dive into Kalman filters and moving averages for smoothing raw MPU6050 data.",
  },
  {
    id: "2",
    title: "Control Systems Basics",
    date: "Sep 2023",
    description: "Notes on PID controllers and their practical application in robotics.",
  },
  {
    id: "3",
    title: "Designing Reliable Input Systems",
    date: "Aug 2023",
    description: "Exploring the challenges of computer vision as a primary input method.",
  },
  {
    id: "4",
    title: "Debugging Embedded Devices",
    date: "Jul 2023",
    description: "Techniques for effective hardware debugging and logic analysis.",
  },
];

interface DataContextType {
  projects: Project[];
  studyItems: StudyItem[];
  addProject: (p: Project) => void;
  updateProject: (p: Project) => void;
  deleteProject: (id: string) => void;
  addStudyItem: (s: StudyItem) => void;
  updateStudyItem: (s: StudyItem) => void;
  deleteStudyItem: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('archive_projects');
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [studyItems, setStudyItems] = useState<StudyItem[]>(() => {
    const saved = localStorage.getItem('archive_study');
    return saved ? JSON.parse(saved) : defaultStudyItems;
  });

  useEffect(() => {
    localStorage.setItem('archive_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('archive_study', JSON.stringify(studyItems));
  }, [studyItems]);

  const addProject = (p: Project) => setProjects(prev => [p, ...prev]);
  const updateProject = (p: Project) => setProjects(prev => prev.map(item => item.id === p.id ? p : item));
  const deleteProject = (id: string) => setProjects(prev => prev.filter(item => item.id !== id));

  const addStudyItem = (s: StudyItem) => setStudyItems(prev => [s, ...prev]);
  const updateStudyItem = (s: StudyItem) => setStudyItems(prev => prev.map(item => item.id === s.id ? s : item));
  const deleteStudyItem = (id: string) => setStudyItems(prev => prev.filter(item => item.id !== id));

  return (
    <DataContext.Provider value={{
      projects, studyItems,
      addProject, updateProject, deleteProject,
      addStudyItem, updateStudyItem, deleteStudyItem
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
