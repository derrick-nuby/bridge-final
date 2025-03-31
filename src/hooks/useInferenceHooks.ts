// file location: src/hooks/useInferenceHooks.ts

// here add loading, mutating and other errors

import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { runClassification, getModelInfo } from "@/services/inference";

export const useGetModelInfo = () => {
  return useQuery({
    queryKey: ["modelInfo"],
    queryFn: () => getModelInfo(),
  });
};

export const useRunClassification = () => {
  return useMutation({
    mutationFn: (features: number[] | string) => runClassification(features),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Classification completed successfully");
      } else {
        toast.error(data.message || "Classification failed");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to run classification");
    },
  });
};

