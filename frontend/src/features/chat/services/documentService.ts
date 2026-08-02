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

  async provideFeedback(documentId: number, isLiked: boolean | null, feedbackText?: string): Promise<any> {
    const response = await axiosInstance.post(`/documents/${documentId}/feedback`, { isLiked, feedbackText });
    return response.data;
  },

  async getComments(documentId: number): Promise<any[]> {
    const response = await axiosInstance.get(`/documents/${documentId}/comments`);
    return response.data;
  },

  async createComment(documentId: number, content: string): Promise<any> {
    const response = await axiosInstance.post(`/documents/${documentId}/comments`, { content });
    return response.data;
  },
};
