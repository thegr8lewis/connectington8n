const API_BASE_URL = 'http://localhost:8000/api';

const cleanResponse = (response) => {
  if (typeof response === 'string' && response.length > 22) {
    return response.slice(17, -5);
  }
  return response;
};

export const api = {
  processQuery: async (query, location = 'Nairobi', farmerId = null) => {
    const payload = { query, location };
    if (farmerId !== null) {
      payload.farmer_id = farmerId;
    }
    
    const response = await fetch(`${API_BASE_URL}/query/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    
    if (data.response) {
      data.response = cleanResponse(data.response);
    }
    
    return data;
  },
  
  getHistory: async (farmerId = null) => {
    const url = farmerId ? `${API_BASE_URL}/history/?farmer_id=${farmerId}` : `${API_BASE_URL}/history/`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item.response_text) {
          item.response_text = cleanResponse(item.response_text);
        }
      });
    }
    
    return data;
  },
  
  getDashboardStats: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/`);
    return response.json();
  },
  
  createProfile: async (profileData) => {
    const response = await fetch(`${API_BASE_URL}/profile/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
    return response.json();
  }
};