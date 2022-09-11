export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      poems: {
        Row: {
          id: number;
          created_at: string | null;
          title: string | null;
          content: string | null;
          email: string | null;
          illustrationurl: string | null;
          hidden: boolean | null;
        };
        Insert: {
          id?: number;
          created_at?: string | null;
          title?: string | null;
          content?: string | null;
          email?: string | null;
          illustrationurl?: string | null;
          hidden?: boolean | null;
        };
        Update: {
          id?: number;
          created_at?: string | null;
          title?: string | null;
          content?: string | null;
          email?: string | null;
          illustrationurl?: string | null;
          hidden?: boolean | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

