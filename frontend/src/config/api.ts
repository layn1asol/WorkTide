export const API_BASE_URL = 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  auth: {
    signup: `${API_BASE_URL}/auth/signup`,
    login: `${API_BASE_URL}/auth/login`,
    me: `${API_BASE_URL}/auth/me`,
  },
  profile: {
    update: `${API_BASE_URL}/profile/update`,
    get: `${API_BASE_URL}/profile`,
    getById: (id: string) => `${API_BASE_URL}/profile/${id}`,
    getAllFreelancers: (search?: string, skills?: string[]) => {
      let url = `${API_BASE_URL}/profile/freelancers`;
      const params = new URLSearchParams();
      
      if (search) {
        params.append('search', search);
      }
      
      if (skills && skills.length > 0) {
        params.append('skills', skills.join(','));
      }
      
      const queryString = params.toString();
      return queryString ? `${url}?${queryString}` : url;
    },
  },
  tasks: {
    create: `${API_BASE_URL}/tasks`,
    getAll: (search?: string, skills?: string[], status?: string) => {
      let url = `${API_BASE_URL}/tasks`;
      const params = new URLSearchParams();
      
      if (search) {
        params.append('search', search);
      }
      
      if (skills && skills.length > 0) {
        params.append('skills', skills.join(','));
      }
      
      if (status) {
        params.append('status', status);
      }
      
      const queryString = params.toString();
      return queryString ? `${url}?${queryString}` : url;
    },
    getById: (id: string) => `${API_BASE_URL}/tasks/${id}`,
    getByClient: (clientId: string) => `${API_BASE_URL}/tasks/client/${clientId}`,
    update: (id: string) => `${API_BASE_URL}/tasks/${id}`,
    delete: (id: string) => `${API_BASE_URL}/tasks/${id}`,
  }
}; 