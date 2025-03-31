// file location: src/services/inference.ts

import axiosInstance from "@/lib/axios";
import { handleAxiosError } from "@/lib/errorHandler";

// Types
export interface ProjectInfo {
  owner: string;
  name: string;
  deploy_version: string;
}

export interface ClassificationResult {
  success: boolean;
  data?: {
    classification: Array<{
      label: string;
      probability: number;
    }>;
  };
  message?: string;
}

export interface ModelInfo {
  success: boolean;
  data?: {
    project: ProjectInfo;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    properties: Record<string, any>;
  };
  message?: string;
}

// Service functions
export const runClassification = async (features: number[] | string): Promise<ClassificationResult> => {
  try {
    const response = await axiosInstance.post<ClassificationResult>("/inference/classify", { features });
    return response.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to run classification"));
  }
};

export const getModelInfo = async (): Promise<ModelInfo> => {
  try {
    const response = await axiosInstance.get<ModelInfo>("/inference/model-info");
    return response.data;
  } catch (error) {
    throw new Error(handleAxiosError(error, "Failed to get model info"));
  }
};