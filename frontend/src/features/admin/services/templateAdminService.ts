import axiosInstance from '@/shared/utils/axiosInstance';
import { PromptTemplate, CreatePromptTemplateRequest, UpdatePromptTemplateRequest } from '../types/admin.types';

export const templateAdminService = {
  async getAll(): Promise<PromptTemplate[]> {
    const response = await axiosInstance.get('/admin/templates');
    return response.data;
  },

  async getById(id: number): Promise<PromptTemplate> {
    const response = await axiosInstance.get(`/admin/templates/${id}`);
    return response.data;
  },

  async create(data: CreatePromptTemplateRequest): Promise<PromptTemplate> {
    const response = await axiosInstance.post('/admin/templates', data);
    return response.data;
  },

  async update(id: number, data: UpdatePromptTemplateRequest): Promise<PromptTemplate> {
    const response = await axiosInstance.put(`/admin/templates/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`/admin/templates/${id}`);
  },
};
