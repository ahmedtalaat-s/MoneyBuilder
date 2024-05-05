export interface Level_post {
  Title: string,
  Objectives: string,
}
export interface Level_get {

  id?: 0,
  title?: string,
  pictureUrl?: string,
  objectives?: string,
  lectures?: [
    {
      id: 0,
      title: string,
      videoUrl: string,
      description: string,
      levelId: 0,
      level: string
    }
  ]

}
