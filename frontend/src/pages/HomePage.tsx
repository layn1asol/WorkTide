import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero section */}
      <div className="relative bg-indigo-800 w-full">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="People working"
          />
          <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
            >
              {t('hero.cta')}
            </Link>
            <Link
              to="/find-work"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {t('findWork')}
            </Link>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className={`py-12 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className={`text-base font-semibold tracking-wide uppercase ${theme === 'dark' ? 'text-indigo-200' : 'text-indigo-600'}`}>{t('features.title')}</h2>
            <p className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('features.subtitle')}
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {/* Feature 1 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className={`text-lg leading-6 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t('features.findWork')}</h3>
                  <p className={`mt-2 text-base ${theme === 'dark' ? 'text-indigo-100' : 'text-gray-500'}`}>
                    {t('features.findWorkDesc')}
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className={`text-lg leading-6 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Hire Talent</h3>
                  <p className={`mt-2 text-base ${theme === 'dark' ? 'text-indigo-100' : 'text-gray-500'}`}>
                    Post your projects and find skilled professionals to help you achieve your goals.
                  </p>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className={`text-lg leading-6 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Work On Your Schedule</h3>
                  <p className={`mt-2 text-base ${theme === 'dark' ? 'text-indigo-100' : 'text-gray-500'}`}>
                    Choose projects that fit your timeline and work whenever it's convenient for you.
                  </p>
                </div>
              </div>
              
              {/* Feature 4 */}
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className={`text-lg leading-6 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Secure Payments</h3>
                  <p className={`mt-2 text-base ${theme === 'dark' ? 'text-indigo-100' : 'text-gray-500'}`}>
                    Our platform ensures safe and timely payments for all completed work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* How it works section */}
      <div className={`py-16 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className={`text-base font-semibold tracking-wide uppercase ${theme === 'dark' ? 'text-indigo-200' : 'text-indigo-600'}`}>Getting Started</h2>
            <p className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              How WorkTide Works
            </p>
            <p className={`mt-4 max-w-2xl text-xl lg:mx-auto ${theme === 'dark' ? 'text-indigo-100' : 'text-gray-500'}`}>
              Follow these simple steps to get started on your freelancing journey.
            </p>
          </div>
          
          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              {/* Step 1 */}
              <div className="text-center">
                <div className={`flex items-center justify-center h-16 w-16 rounded-full mx-auto ${theme === 'dark' ? 'bg-indigo-200 text-indigo-800' : 'bg-indigo-100 text-indigo-600'}`}>
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className={`mt-4 text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Create Your Profile</h3>
                <p className={`mt-2 text-base ${theme === 'dark' ? 'text-indigo-100' : 'text-gray-500'}`}>
                  Sign up and build your professional profile highlighting your skills and experience.
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="text-center">
                <div className={`flex items-center justify-center h-16 w-16 rounded-full mx-auto ${theme === 'dark' ? 'bg-indigo-200 text-indigo-800' : 'bg-indigo-100 text-indigo-600'}`}>
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className={`mt-4 text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Find Opportunities</h3>
                <p className={`mt-2 text-base ${theme === 'dark' ? 'text-indigo-100' : 'text-gray-500'}`}>
                  Browse available projects or submit proposals for jobs that match your expertise.
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="text-center">
                <div className={`flex items-center justify-center h-16 w-16 rounded-full mx-auto ${theme === 'dark' ? 'bg-indigo-200 text-indigo-800' : 'bg-indigo-100 text-indigo-600'}`}>
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className={`mt-4 text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Get Paid</h3>
                <p className={`mt-2 text-base ${theme === 'dark' ? 'text-indigo-100' : 'text-gray-500'}`}>
                  Complete your work and receive payment directly through our secure platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Statistics section */}
      <div className="bg-indigo-800 py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <h3 className="text-5xl font-extrabold text-white">15K+</h3>
              <p className="mt-2 text-xl text-indigo-100">Freelancers</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-extrabold text-white">8K+</h3>
              <p className="mt-2 text-xl text-indigo-100">Clients</p>
            </div>
            <div className="text-center">
              <h3 className="text-5xl font-extrabold text-white">25K+</h3>
              <p className="mt-2 text-xl text-indigo-100">Completed Projects</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials section */}
      <div className={`py-16 w-full ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className={`text-base font-semibold tracking-wide uppercase ${theme === 'dark' ? 'text-indigo-200' : 'text-indigo-600'}`}>Testimonials</h2>
            <p className={`mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              What Our Users Say
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className={`p-6 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center mb-4">
                <img 
                  className="h-12 w-12 rounded-full object-cover mr-4"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User profile"
                />
                <div>
                  <h4 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Sarah Johnson</h4>
                  <p className={theme === 'dark' ? 'text-indigo-200' : 'text-indigo-600'}>UX Designer</p>
                </div>
              </div>
              <p className={theme === 'dark' ? 'text-indigo-100' : 'text-gray-600'}>
                "WorkTide has transformed my freelancing career. I've connected with amazing clients and have a steady stream of projects."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className={`p-6 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center mb-4">
                <img 
                  className="h-12 w-12 rounded-full object-cover mr-4"
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User profile"
                />
                <div>
                  <h4 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Michael Chen</h4>
                  <p className={theme === 'dark' ? 'text-indigo-200' : 'text-indigo-600'}>Web Developer</p>
                </div>
              </div>
              <p className={theme === 'dark' ? 'text-indigo-100' : 'text-gray-600'}>
                "The platform is intuitive and makes it easy to showcase my portfolio. I've increased my client base by 200% since joining."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className={`p-6 rounded-lg shadow-sm ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center mb-4">
                <img 
                  className="h-12 w-12 rounded-full object-cover mr-4"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User profile"
                />
                <div>
                  <h4 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Emily Rodriguez</h4>
                  <p className={theme === 'dark' ? 'text-indigo-200' : 'text-indigo-600'}>Content Writer</p>
                </div>
              </div>
              <p className={theme === 'dark' ? 'text-indigo-100' : 'text-gray-600'}>
                "As a business owner, WorkTide helps me find qualified freelancers quickly. The quality of work has been exceptional."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-indigo-700 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to boost your career?</span>
              <span className="block">Start using WorkTide today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-indigo-100">
              Join thousands of freelancers and businesses already using our platform to connect and collaborate.
            </p>
            <Link
              to="/signup"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
            >
              Sign up for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 