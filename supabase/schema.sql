-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- Create custom types
CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'completed');
CREATE TYPE goal_status AS ENUM ('active', 'completed', 'paused', 'archived');
CREATE TYPE memory_type AS ENUM ('conversation', 'insight', 'achievement', 'reflection');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Waitlist table
CREATE TABLE waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  invited_at TIMESTAMP WITH TIME ZONE,
  joined_at TIMESTAMP WITH TIME ZONE
);

-- Arks table (user spaces)
CREATE TABLE arks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Goals table
CREATE TABLE goals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  ark_id UUID REFERENCES arks(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status goal_status DEFAULT 'active',
  priority INTEGER DEFAULT 1,
  target_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table
CREATE TABLE tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  goal_id UUID REFERENCES goals(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status task_status DEFAULT 'todo',
  priority INTEGER DEFAULT 1,
  due_date DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notes table (for user notes and reflections)
CREATE TABLE notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  ark_id UUID REFERENCES arks(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Memories table (for AI context and RAG)
CREATE TABLE memories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  ark_id UUID REFERENCES arks(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  memory_type memory_type DEFAULT 'conversation',
  embedding vector(1536), -- OpenAI embedding dimension
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversations table (for coach chat history)
CREATE TABLE conversations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  ark_id UUID REFERENCES arks(id) ON DELETE CASCADE NOT NULL,
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  context JSONB, -- RAG context used for this response
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Weekly reviews table
CREATE TABLE weekly_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  ark_id UUID REFERENCES arks(id) ON DELETE CASCADE NOT NULL,
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  summary TEXT NOT NULL,
  achievements TEXT[],
  challenges TEXT[],
  next_week_focus TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_arks_user_id ON arks(user_id);
CREATE INDEX idx_goals_ark_id ON goals(ark_id);
CREATE INDEX idx_tasks_goal_id ON tasks(goal_id);
CREATE INDEX idx_notes_ark_id ON notes(ark_id);
CREATE INDEX idx_memories_ark_id ON memories(ark_id);
CREATE INDEX idx_memories_embedding ON memories USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX idx_conversations_ark_id ON conversations(ark_id);
CREATE INDEX idx_weekly_reviews_ark_id ON weekly_reviews(ark_id);

-- Row Level Security (RLS) policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE arks ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can manage own arks" ON arks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage goals in own arks" ON goals FOR ALL USING (
  EXISTS (SELECT 1 FROM arks WHERE arks.id = goals.ark_id AND arks.user_id = auth.uid())
);
CREATE POLICY "Users can manage tasks in own goals" ON tasks FOR ALL USING (
  EXISTS (
    SELECT 1 FROM goals 
    JOIN arks ON arks.id = goals.ark_id 
    WHERE goals.id = tasks.goal_id AND arks.user_id = auth.uid()
  )
);
CREATE POLICY "Users can manage notes in own arks" ON notes FOR ALL USING (
  EXISTS (SELECT 1 FROM arks WHERE arks.id = notes.ark_id AND arks.user_id = auth.uid())
);
CREATE POLICY "Users can manage memories in own arks" ON memories FOR ALL USING (
  EXISTS (SELECT 1 FROM arks WHERE arks.id = memories.ark_id AND arks.user_id = auth.uid())
);
CREATE POLICY "Users can manage conversations in own arks" ON conversations FOR ALL USING (
  EXISTS (SELECT 1 FROM arks WHERE arks.id = conversations.ark_id AND arks.user_id = auth.uid())
);
CREATE POLICY "Users can manage weekly reviews in own arks" ON weekly_reviews FOR ALL USING (
  EXISTS (SELECT 1 FROM arks WHERE arks.id = weekly_reviews.ark_id AND arks.user_id = auth.uid())
);

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_arks_updated_at BEFORE UPDATE ON arks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notes_updated_at BEFORE UPDATE ON notes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_memories_updated_at BEFORE UPDATE ON memories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
