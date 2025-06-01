export interface SecretItem {
  id: string;
  name: string;
  type: "folder" | "memo";
  content?: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}
