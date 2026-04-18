export type PollInfo = {
  groupSlug: string
  question: string
  creator: string
  createdAt: number
  deadline: number
  optionCount: number
}

export type PollResult = {
  optionIndex: number
  label: string
  voteCount: number
}
