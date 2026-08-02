import axiosInstance from '@/shared/utils/axiosInstance';
import { DocumentVersionItem } from '../types/chat.types';

export const documentService = {
  async createVersion(documentId: number, content: string): Promise<DocumentVersionItem> {
    const response = await axiosInstance.post(`/documents/${documentId}/versions`, { content });
    return response.data;
  },

  async getVersions(documentId: number): Promise<DocumentVersionItem[]> {
    const response = await axiosInstance.get(`/documents/${documentId}/versions`);
    return response.data;
  },
};
