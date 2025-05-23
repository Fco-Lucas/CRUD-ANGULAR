export const API_BASE_URL = 'http://localhost:3000';

// Endpoints da API de autenticação
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`, // Exemplo: POST /login
  REGISTER: `${API_BASE_URL}/register`, // Exemplo: POST /register
  // PROFILE: `${API_BASE_URL}/profile`, // Exemplo: GET /profile (para obter dados do usuário autenticado)
  // LOGOUT: `${API_BASE_URL}/logout` // Se sua API tiver um endpoint de logout
};

// Outros endpoints (ex: para usuários)
export const USER_ENDPOINTS = {
  USERS: `${API_BASE_URL}/users`, // Exemplo: GET /users, POST /users
  USER_BY_ID: (id: string) => `${API_BASE_URL}/users/${id}` // Exemplo: GET /users/:id, PUT /users/:id, DELETE /users/:id
};