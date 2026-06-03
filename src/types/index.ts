export type Role = "teacher" | "student"

export type Profile = {
  id: string
  email: string
  full_name: string
  role: Role
  created_at: string
}

export type Exam = {
  id: string
  title: string
  description: string | null
  duration_minutes: number
  created_by: string
  created_at: string
}

export type Question = {
  id: string
  exam_id: string
  text: string
  type: "multiple_choice" | "true_false" | "text"
  options: string[] | null
  correct_answer: string | null
  points: number
  order: number
}

export type ExamAttempt = {
  id: string
  exam_id: string
  student_id: string
  started_at: string
  submitted_at: string | null
  score: number | null
}

export type Answer = {
  id: string
  attempt_id: string
  question_id: string
  answer: string | null
  score: number | null
}
