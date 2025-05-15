import React, { useState } from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, MapPinIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';

// Mock data for projects
const mockProjects = [
  {
    id: 1,
    title: 'Full Stack Web Developer',
    company: 'TechCorp Inc.',
    location: 'Remote',
    salary: '$50-70/hr',
    duration: '3-6 months',
    description: 'Looking for an experienced full-stack developer to help build our next-generation web application.',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    postedDate: '2 days ago'
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    company: 'DesignStudio',
    location: 'New York, NY',
    salary: '$40-60/hr',
    duration: '6+ months',
    description: 'Join our creative team to design beautiful and intuitive user interfaces for our clients.',
    skills: ['Figma', 'Adobe XD', 'UI Design', 'User Research'],
    postedDate: '1 day ago'
  },
  {
    id: 3,
    title: 'Mobile App Developer',
    company: 'AppWorks',
    location: 'Remote',
    salary: '$45-65/hr',
    duration: '3 months',
    description: 'Seeking a skilled mobile developer to help build and maintain our iOS and Android applications.',
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
    postedDate: '3 days ago'
  }
];

const FindWork: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const allSkills = Array.from(new Set(mockProjects.flatMap(project => project.skills)));

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkills = selectedSkills.length === 0 ||
                         selectedSkills.every(skill => project.skills.includes(skill));
    return matchesSearch && matchesSkills;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Find Work</h1>
          <p className="mt-2 text-sm text-gray-600">
            Browse through available projects and find your next opportunity
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {allSkills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedSkills.includes(skill)
                        ? 'bg-indigo-100 text-indigo-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Project Listings */}
        <div className="space-y-6">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{project.title}</h2>
                  <p className="text-sm text-gray-600 mt-1">{project.company}</p>
                </div>
                <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPinIcon className="h-5 w-5 mr-1" />
                    {project.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <CurrencyDollarIcon className="h-5 w-5 mr-1" />
                    {project.salary}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-5 w-5 mr-1" />
                    {project.duration}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-600">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.skills.map(skill => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center">
                <span className="text-sm text-gray-500">Posted {project.postedDate}</span>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindWork; 