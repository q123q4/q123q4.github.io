export interface HeroData {
  name: string
  tagline: string
  ctaText: string
  ctaLink: string
  avatar: string
}

export interface AboutData {
  bio: string
  skills: string[]
}

export interface Project {
  title: string
  desc: string
  tags: string[]
  link: string
  image?: string
}

export interface Social {
  name: string
  url: string
}

export interface ContactData {
  email: string
  socials: Social[]
}

export interface PortfolioData {
  hero: HeroData
  about: AboutData
  projects: Project[]
  contact: ContactData
}

declare module '@/content/data.json' {
  const data: PortfolioData
  export default data
}

declare module '*.json' {
  const value: any
  export default value
}

