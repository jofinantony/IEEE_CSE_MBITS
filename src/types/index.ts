export type IntentMode = 'all' | 'learn' | 'build' | 'compete' | 'connect';

export type TechnologyCategory = 'AI' | 'Web' | 'Cyber' | 'Data' | 'Cloud' | 'IoT' | 'Systems';

export interface Technology {
  id: string;
  name: string;
  category: TechnologyCategory;
  ring: 'Adopt' | 'Trial' | 'Assess' | 'Hold';
  description: string;
  relatedProjectIds: string[];
  relatedEventIds: string[];
}

export type EventStatus = 'Upcoming' | 'Registration Open' | 'Registration Closed' | 'Completed';

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  category: TechnologyCategory | 'Community' | 'Symposium';
  description: string;
  speaker: {
    name: string;
    role: string;
    affiliation: string;
  };
  whatYouWillLearn: string[];
  whoShouldAttend: string;
  status: EventStatus;
  registrationUrl?: string;
  technologies: string[];
  timelineStatus: 'past' | 'present' | 'upcoming';
  seatsRemaining?: number;
}

export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  category: TechnologyCategory;
  problem: string;
  build: string;
  technologies: string[];
  process: string;
  result: string;
  team: {
    name: string;
    role: string;
  }[];
  githubUrl: string;
  demoUrl?: string;
  status: 'Production' | 'Active Research' | 'Prototype' | 'Beta';
}

export interface ExecomMember {
  id: string;
  name: string;
  role: string;
  tier: 'Advisory' | 'Executive' | 'Domain Lead';
  department: string;
  year?: string;
  bio: string;
  responsibilities: string[];
  avatarFallback: string;
  email: string;
  linkedin?: string;
  github?: string;
  projectsLed?: string[];
}

export interface AchievementItem {
  id: string;
  year: string;
  title: string;
  category: 'Hackathon' | 'IEEE Regional' | 'Research Publication' | 'Chapter Award';
  description: string;
  recipient: string;
  verificationBadge: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: 'Roadmap' | 'Documentation' | 'Starter Kit' | 'Paper Repository';
  category: TechnologyCategory | 'General';
  description: string;
  link: string;
  author: string;
}

export interface AnnouncementItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  badge: 'Critical' | 'Upcoming' | 'Call for Papers' | 'Update';
  actionUrl?: string;
  actionText?: string;
}
