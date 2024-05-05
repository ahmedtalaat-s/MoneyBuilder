export interface Question_get {
  id: 0,
  description: string,
  lectureId: 0,
  answers: [
    {
      id: 0,
      description: string,
      isRight: boolean,
      explaination: string
    }
  ]
}
export interface Question_post {
  description: string,
  lectureId: 0,
  answers: [
    {
      description: string,
      isRight: boolean,
      explaination?: string
    },
    {
      description: string,
      isRight: boolean,
      explaination?: string
    },
    {
      description: string,
      isRight: boolean,
      explaination?: string
    },
    {
      description: string,
      isRight: boolean,
      explaination?: string
    },
  ]
}
