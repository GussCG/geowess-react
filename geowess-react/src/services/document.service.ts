import { supabase } from "../lib/supabase";

export const documentService = {
  async uploadProjectFile(projectId: string, file: File) {
    const filePath = `projects/${projectId}/${file.name}`;

    return supabase.storage.from("project-docs").upload(filePath, file);
  },

  async listProjectFiles(projectId: string) {
    return supabase.storage.from("project-docs").list(projectId);
  },

  async getPublicUrl(path: string) {
    return supabase.storage.from("project-docs").getPublicUrl(path);
  },
};
