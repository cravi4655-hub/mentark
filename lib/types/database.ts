export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
        }
      }
      waitlist: {
        Row: {
          id: string
          email: string
          name: string | null
          created_at: string
          invited_at: string | null
          joined_at: string | null
        }
        Insert: {
          email: string
          name?: string | null
        }
        Update: {
          invited_at?: string | null
          joined_at?: string | null
        }
      }
      arks: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          name: string
          description?: string | null
        }
        Update: {
          name?: string
          description?: string | null
        }
      }
      goals: {
        Row: {
          id: string
          ark_id: string
          title: string
          description: string | null
          status: 'active' | 'completed' | 'paused' | 'archived'
          priority: number
          target_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          ark_id: string
          title: string
          description?: string | null
          status?: 'active' | 'completed' | 'paused' | 'archived'
          priority?: number
          target_date?: string | null
        }
        Update: {
          title?: string
          description?: string | null
          status?: 'active' | 'completed' | 'paused' | 'archived'
          priority?: number
          target_date?: string | null
        }
      }
      tasks: {
        Row: {
          id: string
          goal_id: string
          title: string
          description: string | null
          status: 'todo' | 'in_progress' | 'completed'
          priority: number
          due_date: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          goal_id: string
          title: string
          description?: string | null
          status?: 'todo' | 'in_progress' | 'completed'
          priority?: number
          due_date?: string | null
        }
        Update: {
          title?: string
          description?: string | null
          status?: 'todo' | 'in_progress' | 'completed'
          priority?: number
          due_date?: string | null
          completed_at?: string | null
        }
      }
      notes: {
        Row: {
          id: string
          ark_id: string
          title: string
          content: string
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          ark_id: string
          title: string
          content: string
          tags?: string[] | null
        }
        Update: {
          title?: string
          content?: string
          tags?: string[] | null
        }
      }
      memories: {
        Row: {
          id: string
          ark_id: string
          content: string
          memory_type: 'conversation' | 'insight' | 'achievement' | 'reflection'
          embedding: number[] | null
          metadata: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          ark_id: string
          content: string
          memory_type?: 'conversation' | 'insight' | 'achievement' | 'reflection'
          embedding?: number[] | null
          metadata?: any | null
        }
        Update: {
          content?: string
          memory_type?: 'conversation' | 'insight' | 'achievement' | 'reflection'
          embedding?: number[] | null
          metadata?: any | null
        }
      }
      conversations: {
        Row: {
          id: string
          ark_id: string
          user_message: string
          ai_response: string
          context: any | null
          created_at: string
        }
        Insert: {
          ark_id: string
          user_message: string
          ai_response: string
          context?: any | null
        }
        Update: {
          user_message?: string
          ai_response?: string
          context?: any | null
        }
      }
      weekly_reviews: {
        Row: {
          id: string
          ark_id: string
          week_start: string
          week_end: string
          summary: string
          achievements: string[] | null
          challenges: string[] | null
          next_week_focus: string[] | null
          created_at: string
        }
        Insert: {
          ark_id: string
          week_start: string
          week_end: string
          summary: string
          achievements?: string[] | null
          challenges?: string[] | null
          next_week_focus?: string[] | null
        }
        Update: {
          summary?: string
          achievements?: string[] | null
          challenges?: string[] | null
          next_week_focus?: string[] | null
        }
      }
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
