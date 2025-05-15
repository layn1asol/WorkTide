import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const FindWork: React.FC = () => {
  const { user } = useAuth();

  // Mock data for projects
  const projects = [
    {
      id: 1,
      title: 'Website Development',
      description: 'Looking for a skilled web developer to create a modern e-commerce website.',
      budget: 1500,
      skills: ['React', 'Node.js', 'MongoDB'],
      postedAt: '2024-05-13',
    },
    {
      id: 2,
      title: 'Mobile App Design',
      description: 'Need a UI/UX designer for a fitness tracking mobile application.',
      budget: 2000,
      skills: ['Figma', 'UI Design', 'Mobile Design'],
      postedAt: '2024-05-12',
    },
    {
      id: 3,
      title: 'Content Writing',
      description: 'Seeking a content writer for blog posts about technology and innovation.',
      budget: 800,
      skills: ['Content Writing', 'SEO', 'Technology'],
      postedAt: '2024-05-11',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Find Your Next Project
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Browse through available projects and find the perfect match for your skills.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{project.description}</p>
                <div className="mt-4">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    Budget: ${project.budget}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <button
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm text-gray-500">
                  Posted {new Date(project.postedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindWork; 