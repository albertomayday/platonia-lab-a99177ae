import { useMutation, useQuery, UseMutationOptions } from '@tanstack/react-query';
import backend, { AIResponse, FileUploadResult, DemoSaveResult } from '@/lib/backend';

export function useOpenAIChat() {
  return useMutation<AIResponse, Error, { prompt: string; context?: string }>({
    mutationFn: async ({ prompt, context }) => {
      const res = await backend.generateWithOpenAI(prompt, context);
      if (res.error) throw new Error(res.error);
      return res;
    },
  });
}

export function useFileUpload(options?: UseMutationOptions<FileUploadResult, Error, File>) {
  return useMutation<FileUploadResult, Error, File>({
    mutationFn: async (file: File) => {
      const res = await backend.uploadFile(file);
      if (res.error) throw new Error(res.error);
      return res;
    },
    ...options,
  });
}

export function useSaveDemoResult() {
  return useMutation<DemoSaveResult, Error, Parameters<typeof backend.saveDemoResult>[0]>({
    mutationFn: async (payload) => {
      const res = await backend.saveDemoResult(payload);
      if (res.error) throw new Error(res.error);
      return res;
    },
  });
}

export function useLabDemos(limit = 10) {
  return useQuery({
    queryKey: ['lab_demos', limit],
    queryFn: async () => backend.fetchLabDemos(limit),
  });
}

export function useCorpusEntries() {
  return useQuery({
    queryKey: ['corpus_entries'],
    queryFn: async () => backend.fetchCorpusEntries(),
  });
}
