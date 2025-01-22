export interface Project {
  title: string;
  description: string;
  link: string;
  image: string;
  tags: string[];
}

export interface TimelineItem {
  title: string;
  organization: string;
  period: string;
  description: string | string[];
  type: 'education' | 'work';
  logo?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string;
  logo: string;
  credentialUrl: string;
}