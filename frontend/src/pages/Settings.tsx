import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SunIcon, MoonIcon, LanguageIcon, XCircleIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Education {
  institution: string;
  degree: string;
  year: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  // Add loading state
  const [loading, setLoading] = useState<boolean>(true);

  // Profile form state
  const [title, setTitle] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [hourlyRate, setHourlyRate] = useState<string>('');
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState<string>('');
  const [languages, setLanguages] = useState<string[]>([]);
  const [newLanguage, setNewLanguage] = useState<string>('');
  const [education, setEducation] = useState<Education[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string>('');
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setTitle(user.title || '');
      setBio(user.bio || '');
      setLocation(user.location || '');
      setHourlyRate(user.hourlyRate ? user.hourlyRate.toString() : '');
      setSkills(user.skills || []);
      setLanguages(user.languages || []);
      setEducation(user.education || []);
      setExperience(user.experience || []);
      setImageUrl(user.imageUrl || '');
      setLoading(false);
    } else {
      // If no user data is available after a short timeout, redirect to profile
      const timer = setTimeout(() => {
        if (!user) {
          navigate('/profile');
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  // Handle adding a new skill
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  // Handle removing a skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  // Handle adding a new language
  const handleAddLanguage = () => {
    if (newLanguage.trim() && !languages.includes(newLanguage.trim())) {
      setLanguages([...languages, newLanguage.trim()]);
      setNewLanguage('');
    }
  };

  // Handle removing a language
  const handleRemoveLanguage = (languageToRemove: string) => {
    setLanguages(languages.filter(lang => lang !== languageToRemove));
  };

  // Handle adding a new education entry
  const handleAddEducation = () => {
    setEducation([...education, { institution: '', degree: '', year: '' }]);
  };

  // Handle updating education entry
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = [...education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setEducation(updatedEducation);
  };

  // Handle removing an education entry
  const handleRemoveEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  // Handle adding a new experience entry
  const handleAddExperience = () => {
    setExperience([...experience, { company: '', role: '', period: '', description: '' }]);
  };

  // Handle updating experience entry
  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setExperience(updatedExperience);
  };

  // Handle removing an experience entry
  const handleRemoveExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError('');
    setSaveSuccess(false);

    try {
      const profileData = {
        title,
        bio,
        location,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : undefined,
        skills,
        languages,
        education,
        experience,
        imageUrl
      };

      const success = await updateProfile(profileData);
      
      if (success) {
        setSaveSuccess(true);
        // Navigate to profile page after 1.5 seconds
        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      } else {
        setSaveError(t('errorSavingProfile'));
      }
    } catch (error) {
      setSaveError(t('errorSavingProfile'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t('settings')}</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                {/* Profile Section */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('profileInformation')}</h2>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('professionalTitle')}
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="UI/UX Designer"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('aboutMe')}
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          rows={4}
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Tell potential clients about yourself..."
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('location')}
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="e.g. New York, USA"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('hourlyRate')} (USD)
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          id="hourlyRate"
                          value={hourlyRate}
                          onChange={(e) => setHourlyRate(e.target.value)}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('profileImageUrl')}
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="imageUrl"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Enter a URL for your profile image
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('skills')}</h2>
                  <div className="space-y-4">
                    <div className="flex">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="flex-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
                        placeholder="Add a skill (e.g. React, Figma)"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          <span className="text-sm">{skill}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            <XCircleIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Languages Section */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('languages')}</h2>
                  <div className="space-y-4">
                    <div className="flex">
                      <input
                        type="text"
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                        className="flex-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
                        placeholder="Add a language (e.g. English (Native))"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddLanguage();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddLanguage}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang, index) => (
                        <div key={index} className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                          <span className="text-sm">{lang}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveLanguage(lang)}
                            className="ml-1 text-green-600 hover:text-green-800"
                          >
                            <XCircleIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">{t('education')}</h2>
                    <button
                      type="button"
                      onClick={handleAddEducation}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      {t('addEducation')}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('educationNumber')}{index + 1}
                          </h3>
                          <button
                            type="button"
                            onClick={() => handleRemoveEducation(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <XCircleIcon className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t('institution')}
                            </label>
                            <input
                              type="text"
                              value={edu.institution}
                              onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                              className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t('year')}
                            </label>
                            <input
                              type="text"
                              value={edu.year}
                              onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                              className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="sm:col-span-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t('degree')}
                            </label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                              className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">{t('workExperience')}</h2>
                    <button
                      type="button"
                      onClick={handleAddExperience}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      {t('addExperience')}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {experience.map((exp, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {t('experienceNumber')}{index + 1}
                          </h3>
                          <button
                            type="button"
                            onClick={() => handleRemoveExperience(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <XCircleIcon className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t('company')}
                            </label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                              className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t('period')}
                            </label>
                            <input
                              type="text"
                              value={exp.period}
                              onChange={(e) => handleExperienceChange(index, 'period', e.target.value)}
                              className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              placeholder="2019-2022"
                            />
                          </div>

                          <div className="sm:col-span-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t('role')}
                            </label>
                            <input
                              type="text"
                              value={exp.role}
                              onChange={(e) => handleExperienceChange(index, 'role', e.target.value)}
                              className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>

                          <div className="sm:col-span-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              {t('description')}
                            </label>
                            <textarea
                              rows={3}
                              value={exp.description}
                              onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                              className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* App Settings */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{t('appSettings')}</h2>
                  
                  {/* Theme Settings */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">{t('appearance')}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {theme === 'light' ? (
                          <SunIcon className="h-6 w-6 text-yellow-500" />
                        ) : (
                          <MoonIcon className="h-6 w-6 text-blue-400" />
                        )}
                        <span className="text-gray-700 dark:text-gray-300">{t('darkMode')}</span>
                      </div>
                      <button
                        type="button"
                        onClick={toggleTheme}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                        role="switch"
                        aria-checked={theme === 'dark'}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Language Settings */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">{t('language')}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          id="language-en"
                          name="language"
                          type="radio"
                          checked={language === 'en'}
                          onChange={() => changeLanguage('en')}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="language-en" className="text-gray-700 dark:text-gray-300">
                          {t('english')}
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          id="language-uk"
                          name="language"
                          type="radio"
                          checked={language === 'uk'}
                          onChange={() => changeLanguage('uk')}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="language-uk" className="text-gray-700 dark:text-gray-300">
                          {t('ukrainian')}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-5 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-end">
                    {saveError && (
                      <p className="text-sm text-red-600 mr-4 self-center">{saveError}</p>
                    )}
                    {saveSuccess && (
                      <p className="text-sm text-green-600 mr-4 self-center">{t('profileSavedSuccess')}</p>
                    )}
                    <button
                      type="button"
                      onClick={() => navigate('/profile')}
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {t('cancel')}
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70"
                    >
                      {saving ? t('saving') : t('saveChanges')}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings; 