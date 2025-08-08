// API configuration
const API_BASE_URL = 'http://localhost:3000/api/admin';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Course API functions
export const courseAPI = {
  // Get all courses
  getAllCourses: async () => {
    return await apiCall('/courses');
  },

  // Get single course
  getCourse: async (id) => {
    return await apiCall(`/courses/${id}`);
  },

  // Create new course
  createCourse: async (courseData) => {
    return await apiCall('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  },

  // Update course
  updateCourse: async (id, courseData) => {
    return await apiCall(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    });
  },

  // Delete course
  deleteCourse: async (id) => {
    return await apiCall(`/courses/${id}`, {
      method: 'DELETE',
    });
  },

  // Add material to course
  addMaterial: async (courseId, materialData) => {
    return await apiCall(`/courses/${courseId}/materials`, {
      method: 'POST',
      body: JSON.stringify(materialData),
    });
  },

  // Update material
  updateMaterial: async (materialId, materialData) => {
    return await apiCall(`/materials/${materialId}`, {
      method: 'PUT',
      body: JSON.stringify(materialData),
    });
  },

  // Delete material
  deleteMaterial: async (materialId) => {
    return await apiCall(`/materials/${materialId}`, {
      method: 'DELETE',
    });
  },

  // Get course statistics
  getStats: async () => {
    return await apiCall('/stats');
  },
};

// Student Notification API functions
export const studentNotificationAPI = {
  // Get student notifications
  getNotifications: async () => {
    const response = await fetch('http://localhost:3000/api/student/notifications');
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }
    return await response.json();
  },

  // Mark notification as read
  markAsRead: async (id) => {
    const response = await fetch(`http://localhost:3000/api/student/notifications/${id}/read`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      throw new Error('Failed to mark notification as read');
    }
    return await response.json();
  },

  // Clear all notifications
  clearAll: async () => {
    const response = await fetch('http://localhost:3000/api/student/notifications', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      throw new Error('Failed to clear notifications');
    }
    return await response.json();
  },
};

export default { courseAPI, studentNotificationAPI };
