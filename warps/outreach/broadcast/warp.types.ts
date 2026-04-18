export type OutreachContact = {
  id: string
  name: string
  phone: string | null
  email: string | null
  company: string | null
  tags: string[] | null
}

export type BroadcastPublicData = {
  contacts: OutreachContact[]
  agentUuid: string
}

export type BroadcastChannel = 'whatsapp' | 'email'
