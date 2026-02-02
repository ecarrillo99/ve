import axios from "axios";
import Cookies from 'js-cookie';

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:8007";
const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE_URL || "http://localhost:8005";

const vinoApiService = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

vinoApiService.interceptors.request.use(
  (config) => {
    try {
      const token = Cookies.get('accessToken') || localStorage.getItem('accessToken');
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (e) { console.warn('Error getting token:', e); }
    return config;
  },
  (error) => Promise.reject(error)
);

// ============ ENDPOINTS ============
export const ENDPOINTS = {
  OFFERTS: '/offerts',
  INVENTORIES: '/inventories',
  ESTABLISHMENTS: '/establishments',
  UPLOAD_IMAGE: '/upload/image',
  UPLOAD_OFFERT_IMAGE: (id) => `/upload/offert-image/${id}`,
  UPLOAD_INVENTORY_IMAGE: (id) => `/upload/inventory-image/${id}`,
  UPLOAD_ESTABLISHMENT_LOGO: (id) => `/upload/establishment-logo/${id}`,
};

// ============ HELPERS ============
const extractUrlFromUploadResponse = (res) => {
  const body = res?.data || res;
  if (!body) return null;
  if (typeof body === 'string' && body.startsWith('http')) return body;
  if (body.data?.url) return body.data.url;
  if (body.url) return body.url;
  if (body.data?.filename) return `${IMAGE_BASE}/img/${body.data.filename}`;
  if (body.filename) return `${IMAGE_BASE}/img/${body.filename}`;
  return null;
};

const createImageFormData = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return formData;
};

/**
 * Prepara el payload para enviar al backend
 * - Convierte price a string (el backend espera string para Decimal)
 */
const preparePayload = (payload) => {
  const prepared = { ...payload };
  
  // Convertir price a string si existe
  if (prepared.price !== undefined && prepared.price !== null && prepared.price !== '') {
    prepared.price = String(prepared.price);
  }
  
  return prepared;
};

// ============ OFERTAS ============
export const getWineOffers = async () => {
  const response = await vinoApiService.get(ENDPOINTS.OFFERTS);
  return response.data;
};

export const getWineOfferById = async (id) => {
  const response = await vinoApiService.get(`${ENDPOINTS.OFFERTS}/${id}`);
  return response.data;
};

export const createOffert = async (payload) => {
  const response = await vinoApiService.post(ENDPOINTS.OFFERTS, preparePayload(payload));
  return response.data;
};

export const updateOffert = async (offertId, payload) => {
  const response = await vinoApiService.patch(`${ENDPOINTS.OFFERTS}/${offertId}`, preparePayload(payload));
  return response.data;
};

export const deleteOffert = async (offertId) => {
  const response = await vinoApiService.delete(`${ENDPOINTS.OFFERTS}/${offertId}`);
  return response.data;
};

// ============ INVENTARIOS ============
export const getInventories = async () => {
  const response = await vinoApiService.get(ENDPOINTS.INVENTORIES);
  return response.data;
};

export const getInventoryById = async (id) => {
  const response = await vinoApiService.get(`${ENDPOINTS.INVENTORIES}/${id}`);
  return response.data;
};

export const createInventory = async (payload) => {
  const response = await vinoApiService.post(ENDPOINTS.INVENTORIES, preparePayload(payload));
  return response.data;
};

export const updateInventory = async (inventoryId, payload) => {
  const response = await vinoApiService.patch(`${ENDPOINTS.INVENTORIES}/${inventoryId}`, preparePayload(payload));
  return response.data;
};

export const deleteInventory = async (inventoryId) => {
  const response = await vinoApiService.delete(`${ENDPOINTS.INVENTORIES}/${inventoryId}`);
  return response.data;
};

// ============ ESTABLECIMIENTOS ============
export const getEstablishments = async () => {
  const response = await vinoApiService.get(ENDPOINTS.ESTABLISHMENTS);
  return response.data;
};

export const getEstablishmentById = async (id) => {
  const response = await vinoApiService.get(`${ENDPOINTS.ESTABLISHMENTS}/${id}`);
  return response.data;
};

// ============ UPLOADS ============
export const uploadImage = async (file) => {
  const formData = createImageFormData(file);
  const response = await vinoApiService.post(ENDPOINTS.UPLOAD_IMAGE, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return extractUrlFromUploadResponse(response);
};

export const uploadOffertImage = async (offertId, file) => {
  const formData = createImageFormData(file);
  const response = await vinoApiService.post(ENDPOINTS.UPLOAD_OFFERT_IMAGE(offertId), formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return extractUrlFromUploadResponse(response);
};

export const uploadInventoryImage = async (inventoryId, file) => {
  const formData = createImageFormData(file);
  const response = await vinoApiService.post(ENDPOINTS.UPLOAD_INVENTORY_IMAGE(inventoryId), formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return extractUrlFromUploadResponse(response);
};

export const uploadEstablishmentLogo = async (establishmentId, file) => {
  const formData = createImageFormData(file);
  const response = await vinoApiService.post(ENDPOINTS.UPLOAD_ESTABLISHMENT_LOGO(establishmentId), formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return extractUrlFromUploadResponse(response);
};

export const vinoApi = {
  get: (url, config) => vinoApiService.get(url, config),
  post: (url, data, config) => vinoApiService.post(url, data, config),
  patch: (url, data, config) => vinoApiService.patch(url, data, config),
  delete: (url, config) => vinoApiService.delete(url, config),
};

export default vinoApiService;