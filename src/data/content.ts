import {
  EventItem,
  ProjectItem,
  ExecomMember,
  AchievementItem,
  ResourceItem,
  Technology,
  AnnouncementItem
} from '../types';

export const INITIAL_TECHNOLOGIES: Technology[] = [
  {
    id: 'tech-python',
    name: 'Python',
    category: 'AI',
    ring: 'Adopt',
    description: 'De facto standard for scientific computing, tensor manipulation, and backend automation.',
    relatedProjectIds: ['proj-biosignal', 'proj-secaudit'],
    relatedEventIds: ['event-bytes-neurons', 'event-algoverse']
  },
  {
    id: 'tech-pytorch',
    name: 'PyTorch',
    category: 'AI',
    ring: 'Adopt',
    description: 'Dynamic graph deep learning framework for anomaly detection & transformer modeling.',
    relatedProjectIds: ['proj-biosignal'],
    relatedEventIds: ['event-bytes-neurons']
  },
  {
    id: 'tech-react',
    name: 'React',
    category: 'Web',
    ring: 'Adopt',
    description: 'Component architecture powering client interfaces and interactive data exploration.',
    relatedProjectIds: ['proj-pulsenet', 'proj-campusorbit'],
    relatedEventIds: ['event-pulse-2026']
  },
  {
    id: 'tech-typescript',
    name: 'TypeScript',
    category: 'Web',
    ring: 'Adopt',
    description: 'Strict type safety and robust refactoring tools across large campus software codebases.',
    relatedProjectIds: ['proj-pulsenet', 'proj-campusorbit'],
    relatedEventIds: ['event-pulse-2026']
  },
  {
    id: 'tech-go',
    name: 'Go',
    category: 'Systems',
    ring: 'Adopt',
    description: 'High-throughput concurrency primitives for distributed telemetry and microservice orchestration.',
    relatedProjectIds: ['proj-pulsenet'],
    relatedEventIds: ['event-cloudnative', 'event-pulse-2026']
  },
  {
    id: 'tech-rust',
    name: 'Rust',
    category: 'Systems',
    ring: 'Trial',
    description: 'Memory-safe systems programming for security scanners and low-level firmware parsers.',
    relatedProjectIds: ['proj-secaudit'],
    relatedEventIds: ['event-kernel-code']
  },
  {
    id: 'tech-kubernetes',
    name: 'Kubernetes',
    category: 'Cloud',
    ring: 'Trial',
    description: 'Container orchestration for hosting chapter services and continuous benchmark environments.',
    relatedProjectIds: ['proj-pulsenet'],
    relatedEventIds: ['event-cloudnative']
  },
  {
    id: 'tech-cybersecurity',
    name: 'Cybersecurity',
    category: 'Cyber',
    ring: 'Adopt',
    description: 'Offensive security auditing, static binary analysis, and cryptographic authentication.',
    relatedProjectIds: ['proj-secaudit'],
    relatedEventIds: ['event-hackpulse', 'event-pulse-2026']
  },
  {
    id: 'tech-esp32',
    name: 'ESP32 & RTOS',
    category: 'IoT',
    ring: 'Trial',
    description: 'Microcontroller firmware for wireless sensor telemetry and energy-efficient edge nodes.',
    relatedProjectIds: ['proj-pulsenet'],
    relatedEventIds: ['event-hackpulse']
  },
  {
    id: 'tech-postgresql',
    name: 'PostgreSQL',
    category: 'Data',
    ring: 'Adopt',
    description: 'Relational storage with ACID guarantees, JSONB operators, and connection pooling.',
    relatedProjectIds: ['proj-campusorbit'],
    relatedEventIds: ['event-pulse-2026']
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'event-pulse-2026',
    title: 'Pulse 2026: Flagship Computing Symposium',
    date: 'November 14-15, 2026',
    time: '09:00 AM – 05:30 PM IST',
    venue: 'Main Auditorium & Innovation Concourse, MBITS',
    category: 'Symposium',
    description: 'The annual two-day flagship technical conclave of IEEE Computer Society MBITS. Uniting student researchers, open-source engineers, and industry leaders across distributed systems, applied intelligence, and secure computing.',
    speaker: {
      name: 'Dr. Radhika Menon & Invited Keynotes',
      role: 'Principal Research Scientist',
      affiliation: 'Center for Distributed Systems & IEEE Senior Member'
    },
    whatYouWillLearn: [
      'Architectures for latency-critical distributed computing',
      'Deploying lightweight neural weights on edge microcontrollers',
      'Career pathways in systems engineering & IEEE computing fellowships'
    ],
    whoShouldAttend: 'Undergraduate engineers, graduate researchers, open-source contributors, and curious builders across Kerala.',
    status: 'Upcoming',
    registrationUrl: '#register',
    technologies: ['Systems', 'AI', 'Cloud', 'Cyber'],
    timelineStatus: 'upcoming',
    seatsRemaining: 42
  },
  {
    id: 'event-bytes-neurons',
    title: 'Bytes & Neurons: Deep Learning Hands-On Workshop',
    date: 'October 24, 2026',
    time: '01:30 PM – 05:00 PM IST',
    venue: 'Central Computing Lab 2, MBITS',
    category: 'AI',
    description: 'An intensive, code-first lab diving into PyTorch tensor fundamentals, convolutional feature extraction, and modern transformer attention heads. Attendees train and evaluate a live anomaly detection model.',
    speaker: {
      name: 'Devika R. & AI Research Group',
      role: 'AI/ML Lead, IEEE CS MBITS',
      affiliation: 'MBITS CSE Dept & Student Researcher'
    },
    whatYouWillLearn: [
      'PyTorch autograd mechanics and custom Dataset loaders',
      'Fine-tuning lightweight transformer backbones on small datasets',
      'Optimizing inference with ONNX Runtime for web deployment'
    ],
    whoShouldAttend: 'Students with basic Python proficiency who want to build real deep learning pipelines rather than toy demos.',
    status: 'Registration Open',
    registrationUrl: '#register',
    technologies: ['Python', 'PyTorch', 'AI'],
    timelineStatus: 'upcoming',
    seatsRemaining: 18
  },
  {
    id: 'event-hackpulse',
    title: 'HackPulse MBITS 2026: 24-Hour Code Sprint',
    date: 'December 05-06, 2026',
    time: 'Starts 10:00 AM IST (24 Hours)',
    venue: 'Innovation & Incubation Hub, MBITS',
    category: 'Community',
    description: 'The premier collegiate hackathon hosted by IEEE CS MBITS. Teams tackle high-impact problem statements across healthcare diagnostics, energy microgrids, and accessible civic tech with mentors on site.',
    speaker: {
      name: 'Panel of Technical Mentors',
      role: 'Industry Architects & Alumni',
      affiliation: 'IEEE Kerala Section & Tech Startups'
    },
    whatYouWillLearn: [
      'Rapid prototype scaffolding under 24-hour delivery pressure',
      'Integrating hardware peripherals with cloud telemetry',
      'Pitching engineering architecture and feasibility to technical judges'
    ],
    whoShouldAttend: 'Student teams of 2 to 4 members. Hardware and software tracks open.',
    status: 'Upcoming',
    registrationUrl: '#register',
    technologies: ['Web', 'Cloud', 'IoT', 'AI'],
    timelineStatus: 'upcoming',
    seatsRemaining: 15
  },
  {
    id: 'event-cloudnative',
    title: 'CloudNative Zero-to-One: Go & Microservices',
    date: 'September 20, 2026',
    time: '02:00 PM – 05:00 PM IST',
    venue: 'Advanced Systems Lab, MBITS',
    category: 'Systems',
    description: 'A deep architectural session on building microservice architectures using Go, gRPC protocols, and containerization best practices.',
    speaker: {
      name: 'Joel Shaji',
      role: 'Systems & Cloud Lead',
      affiliation: 'IEEE CS MBITS & Open-Source Contributor'
    },
    whatYouWillLearn: [
      'Go goroutines, channels, and sync primitives under load',
      'Defining protobuf contracts and high-performance gRPC services',
      'Multi-stage Docker builds and minimal Linux container boundaries'
    ],
    whoShouldAttend: 'Engineers who want to build production backends beyond conventional monoliths.',
    status: 'Completed',
    technologies: ['Go', 'Systems', 'Cloud'],
    timelineStatus: 'past'
  },
  {
    id: 'event-kernel-code',
    title: 'Kernel & Code: Linux Systems & Memory Safety',
    date: 'August 14, 2026',
    time: '02:00 PM – 04:30 PM IST',
    venue: 'Seminar Hall 1, MBITS',
    category: 'Systems',
    description: 'Exploring how the Linux kernel schedules tasks, virtual memory management, and how modern languages like Rust guarantee spatial memory safety.',
    speaker: {
      name: 'Joffin A. & Guest Alumni',
      role: 'Chair & Webmaster',
      affiliation: 'IEEE CS MBITS'
    },
    whatYouWillLearn: [
      'Virtual address translation and page tables',
      'System calls and trace tooling with strace and perf',
      'Rust ownership models preventing buffer overruns'
    ],
    whoShouldAttend: 'Developers curious about what happens below high-level frameworks.',
    status: 'Completed',
    technologies: ['Rust', 'Systems', 'Cybersecurity'],
    timelineStatus: 'past'
  },
  {
    id: 'event-algoverse',
    title: 'Algoverse: Graph Theory & Competitive Foundations',
    date: 'July 18, 2026',
    time: '10:00 AM – 01:00 PM IST',
    venue: 'Virtual & Lab 1, MBITS',
    category: 'Data',
    description: 'Interactive problem-solving masterclass covering shortest-path algorithms, topological sorts, and dynamic programming on trees.',
    speaker: {
      name: 'Eldho P. Joy',
      role: 'Secretary & Competitive Lead',
      affiliation: 'IEEE CS MBITS'
    },
    whatYouWillLearn: [
      'Dijkstra, Bellman-Ford, and Floyd-Warshall asymptotic trade-offs',
      'Bitmask dynamic programming patterns',
      'Clean C++ / Python coding for competitive programming platforms'
    ],
    whoShouldAttend: 'Students preparing for ICPC, coding challenges, and technical engineering interviews.',
    status: 'Completed',
    technologies: ['Python', 'Data'],
    timelineStatus: 'past'
  }
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-pulsenet',
    name: 'PulseNet',
    tagline: 'High-throughput edge telemetry and distributed routing daemon.',
    category: 'Systems',
    problem: 'College lab nodes and campus IoT sensors generated fragmented telemetry without real-time failover or low-latency aggregation under unstable local networks.',
    build: 'Engineered a concurrent Go daemon that multiplexes edge sensor streams via WebSockets with Redis stream buffering and an interactive React operator dashboard.',
    technologies: ['Go', 'TypeScript', 'React', 'Kubernetes'],
    process: 'Benchmarked TCP vs UDP frame drops, implemented adaptive batch compression using zstandard, and structured client heartbeat monitors.',
    result: 'Sub-18ms local median latency across 60 simultaneous lab workstations with zero frame loss over simulated 15% network packet drops.',
    team: [
      { name: 'Joel Shaji', role: 'Lead Systems Architect' },
      { name: 'Joffin A.', role: 'Frontend & UI Protocol' }
    ],
    githubUrl: 'https://github.com/mbits-ieee-cs/pulsenet',
    demoUrl: '#demo-pulsenet',
    status: 'Production'
  },
  {
    id: 'proj-biosignal',
    name: 'BioSignal AI',
    tagline: 'Edge transformer for physiological waveform anomaly screening.',
    category: 'AI',
    problem: 'Standard ECG/EEG monitoring equipment often requires bulky cloud connections for anomaly screening, presenting privacy risks and round-trip delays in rural triage.',
    build: 'Trained a 1.2M parameter 1D convolutional transformer model capable of running entirely in-browser or on low-power ARM microprocessors via ONNX Runtime.',
    technologies: ['Python', 'PyTorch', 'AI'],
    process: 'Curated 14,000 anonymized MIT-BIH arrhythmia recordings, applied synthetic baseline wander filters, and quantized weights to INT8.',
    result: 'Achieved 97.4% F1-score on ventricular ectopic beat classification with 2.4ms per-window inference on standard mobile browsers.',
    team: [
      { name: 'Devika R.', role: 'AI Model Researcher' },
      { name: 'Sneha Elizabeth', role: 'Clinical Dataset Lead' }
    ],
    githubUrl: 'https://github.com/mbits-ieee-cs/biosignal-ai',
    demoUrl: '#demo-biosignal',
    status: 'Active Research'
  },
  {
    id: 'proj-campusorbit',
    name: 'CampusOrbit',
    tagline: 'Decentralized hardware & compute resource booking platform.',
    category: 'Web',
    problem: 'Students struggled to reserve high-GPU workstations and oscilloscope benches across different departments without physical sign-in sheets.',
    build: 'Constructed an open-source role-based scheduling platform featuring automated conflict resolution, QR-based check-in, and calendar sync.',
    technologies: ['TypeScript', 'React', 'PostgreSQL'],
    process: 'Designed relational schema with PostgreSQL advisory locks to prevent double-booking race conditions during high-demand project submission weeks.',
    result: 'Eliminated hardware scheduling conflicts across 4 engineering departments with over 800 student reservations logged per semester.',
    team: [
      { name: 'Eldho P. Joy', role: 'Full-Stack Lead' },
      { name: 'Mathew K. Kurian', role: 'Database & Security' }
    ],
    githubUrl: 'https://github.com/mbits-ieee-cs/campusorbit',
    demoUrl: '#demo-campusorbit',
    status: 'Production'
  },
  {
    id: 'proj-secaudit',
    name: 'SecAudit',
    tagline: 'Static bytecode vulnerability scanner for web microservices.',
    category: 'Cyber',
    problem: 'Student web projects frequently shipped with unpinned dependency vulnerabilities and exposed credential patterns in client builds.',
    build: 'Built a lightweight Rust static analysis CLI tool that inspects compiled WebAssembly and AST trees for secret leaks and unsafe memory dereferences.',
    technologies: ['Rust', 'Cybersecurity', 'Python'],
    process: 'Crafted custom tree-sitter AST queries and regex entropy checks compiled into a standalone 4MB cross-platform binary.',
    result: 'Integrated as a pre-commit hook into IEEE CS student repositories, catching 140+ inadvertent secrets before pull request approvals.',
    team: [
      { name: 'Joffin A.', role: 'Security Architect' },
      { name: 'Ananya S. Nair', role: 'Rules Engine & CI/CD' }
    ],
    githubUrl: 'https://github.com/mbits-ieee-cs/secaudit',
    demoUrl: '#demo-secaudit',
    status: 'Beta'
  }
];

export const INITIAL_EXECOM: ExecomMember[] = [
  {
    id: 'person-counselor',
    name: 'Dr. Binu K. Mathew',
    role: 'Branch Counselor & Mentor',
    tier: 'Advisory',
    department: 'Computer Science & Engineering',
    bio: 'Associate Professor & Senior Member of IEEE with over 18 years of academic leadership. Guiding the chapter toward research excellence and high-impact student projects.',
    responsibilities: [
      'Strategic chapter governance and IEEE Kerala Section liaison',
      'Academic advisory for student research publications',
      'Institutional support for national hackathons and symposiums'
    ],
    avatarFallback: 'BM',
    email: 'counselor@mbits.edu.in'
  },
  {
    id: 'person-advisor',
    name: 'Prof. Shani K. R.',
    role: 'Faculty Chapter Advisor',
    tier: 'Advisory',
    department: 'Computer Science & Engineering',
    bio: 'Assistant Professor specializing in Artificial Intelligence and Cloud Computing. Actively mentoring students in open-source development and technical symposiums.',
    responsibilities: [
      'Faculty oversight for IEEE Computer Society technical tracks',
      'Coordination of faculty development and student workshops',
      'Budgetary approval and academic event planning'
    ],
    avatarFallback: 'SK',
    email: 'shani.kr@mbits.edu.in'
  },
  {
    id: 'person-chair',
    name: 'Joffin A.',
    role: 'Chairperson & Dev Lead',
    tier: 'Executive',
    department: 'B.Tech Computer Science & Engineering',
    year: 'Final Year (2026)',
    bio: 'Open-source enthusiast and systems programmer. Passionate about building robust software, fostering peer mentorship, and elevating MBITS onto the global IEEE map.',
    responsibilities: [
      'Overall chapter direction, strategy, and vision execution',
      'Overseeing digital platforms, technical infrastructure, and Build Lab',
      'Representing IEEE CS MBITS across IEEE Kochi Hub and Kerala Section'
    ],
    avatarFallback: 'JA',
    email: 'joffin.a2002@gmail.com',
    github: 'https://github.com/joffin-a',
    linkedin: 'https://linkedin.com/in/joffin-a',
    projectsLed: ['PulseNet', 'SecAudit']
  },
  {
    id: 'person-vicechair',
    name: 'Ananya S. Nair',
    role: 'Vice Chairperson',
    tier: 'Executive',
    department: 'B.Tech Computer Science & Engineering',
    year: 'Pre-Final Year',
    bio: 'Cybersecurity advocate and competitive programmer. Leads chapter partnerships, outreach drives, and technical study cohorts for junior members.',
    responsibilities: [
      'Secondary executive leadership and operations coordination',
      'Curating collegiate tech competitions and inter-college relations',
      'Mentoring women in tech and IEEE WIE collaborations'
    ],
    avatarFallback: 'AN',
    email: 'ananya.nair@mbits.ac.in',
    linkedin: 'https://linkedin.com/in/ananya-s-nair',
    projectsLed: ['SecAudit']
  },
  {
    id: 'person-secretary',
    name: 'Eldho P. Joy',
    role: 'Secretary',
    tier: 'Executive',
    department: 'B.Tech Computer Science & Engineering',
    year: 'Pre-Final Year',
    bio: 'Full-stack software developer and algorithm enthusiast. Manages official correspondence, reporting to IEEE Headquarters, and event documentation.',
    responsibilities: [
      'IEEE CS activity reporting, minutes of meetings, and records',
      'Member registration and chapter onboarding coordination',
      'Coordination with collegiate departments and administration'
    ],
    avatarFallback: 'EJ',
    email: 'eldho.joy@mbits.ac.in',
    github: 'https://github.com/eldho-p-joy',
    projectsLed: ['CampusOrbit']
  },
  {
    id: 'person-treasurer',
    name: 'Mathew K. Kurian',
    role: 'Treasurer & Finance Lead',
    tier: 'Executive',
    department: 'B.Tech Computer Science & Engineering',
    year: 'Pre-Final Year',
    bio: 'Disciplined operations enthusiast handling sponsorship outreach, fiscal transparency, and event budgeting for all IEEE CS MBITS initiatives.',
    responsibilities: [
      'Fiscal budgeting, fund allocations, and reimbursement audits',
      'Corporate sponsorships and vendor coordination',
      'Financial compliance reporting to IEEE Student Branch'
    ],
    avatarFallback: 'MK',
    email: 'mathew.kurian@mbits.ac.in',
    projectsLed: ['CampusOrbit']
  },
  {
    id: 'person-systems-lead',
    name: 'Joel Shaji',
    role: 'Systems & Cloud Lead',
    tier: 'Domain Lead',
    department: 'B.Tech Computer Science & Engineering',
    year: 'Final Year',
    bio: 'Distributed systems tinkerer and Linux evangelist. Maintains the chapter server infrastructure and conducts cloud-native bootcamps.',
    responsibilities: [
      'Infrastructure maintenance, Docker & Kubernetes labs',
      'Organizing backend engineering workshops and hackathon server ops',
      'Guiding students on microservices and DevOps practices'
    ],
    avatarFallback: 'JS',
    email: 'joel.shaji@mbits.ac.in',
    github: 'https://github.com/joel-shaji',
    projectsLed: ['PulseNet']
  },
  {
    id: 'person-ai-lead',
    name: 'Devika R.',
    role: 'AI / Machine Learning Lead',
    tier: 'Domain Lead',
    department: 'B.Tech Computer Science & Engineering',
    year: 'Final Year',
    bio: 'Undergraduate researcher focusing on biomedical signal processing and deep neural networks. Spearheads the weekly AI Reading Group.',
    responsibilities: [
      'Directing the AI/ML hands-on workshops and Kaggle study circles',
      'Advising student teams on paper writing and dataset curation',
      'Hosting the Bytes & Neurons learning track'
    ],
    avatarFallback: 'DR',
    email: 'devika.r@mbits.ac.in',
    linkedin: 'https://linkedin.com/in/devika-r-ai',
    projectsLed: ['BioSignal AI']
  },
  {
    id: 'person-design-lead',
    name: 'Alen Thomas',
    role: 'Design & Visual Identity Lead',
    tier: 'Domain Lead',
    department: 'B.Tech Computer Science & Engineering',
    year: 'Third Year',
    bio: 'Interaction designer focused on typography, human-computer interfaces, and high-craft digital products that communicate complex ideas simply.',
    responsibilities: [
      'Brand governance, event collateral, and interface design tokens',
      'Design workshops on Figma, accessibility, and visual hierarchy',
      'Ensuring aesthetic excellence across all chapter media'
    ],
    avatarFallback: 'AT',
    email: 'alen.thomas@mbits.ac.in'
  },
  {
    id: 'person-ops-lead',
    name: 'Sneha Elizabeth',
    role: 'Event Operations Lead',
    tier: 'Domain Lead',
    department: 'B.Tech Computer Science & Engineering',
    year: 'Third Year',
    bio: 'Operations strategist dedicated to flawless event execution, speaker hospitality, and participant engagement across flagship conferences.',
    responsibilities: [
      'Venue logistics, technical stage ops, and volunteer management',
      'Attendee experience, registration check-in, and feedback loops',
      'Coordination of HackPulse 24-hour hackathon logistics'
    ],
    avatarFallback: 'SE',
    email: 'sneha.elizabeth@mbits.ac.in',
    projectsLed: ['BioSignal AI']
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    year: '2026',
    title: 'Outstanding Student Branch Chapter Commendation',
    category: 'IEEE Regional',
    description: 'Recognized by the IEEE Kerala Section Computer Society Chapter for exceptional member engagement, technical project outputs, and student-led bootcamps.',
    recipient: 'IEEE Computer Society MBITS Chapter',
    verificationBadge: 'IEEE Kerala Section Official Award'
  },
  {
    id: 'ach-2',
    year: '2026',
    title: 'Smart India Hackathon Finalist Status',
    category: 'Hackathon',
    description: 'Student team led by chapter members secured top-tier finalist spot for developing an automated edge-diagnostic system for rural telemetry.',
    recipient: 'BioSignal AI Project Team',
    verificationBadge: 'Government of India SIH Finalist'
  },
  {
    id: 'ach-3',
    year: '2025',
    title: 'IEEE Xplore Conference Paper Publication',
    category: 'Research Publication',
    description: 'Undergraduate research on low-latency sensor multiplexing in constrained networks presented and indexed in IEEE Xplore digital library.',
    recipient: 'Student Authors: Joel Shaji & Joffin A.',
    verificationBadge: 'DOI: 10.1109/ICCES.2025.109823'
  },
  {
    id: 'ach-4',
    year: '2025',
    title: 'Kochi Hub Best Technical Initiative Award',
    category: 'Chapter Award',
    description: 'Conferred during IEEE Kochi Hub Meet for organizing the high-impact "Kernel & Code" systems series for underclassmen.',
    recipient: 'Executive Committee 2025-26',
    verificationBadge: 'IEEE Kochi Hub Council'
  }
];

export const INITIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'res-systems',
    title: 'Systems & Distributed Computing Curriculum',
    type: 'Roadmap',
    category: 'Systems',
    description: 'Comprehensive 12-week progression from C memory layouts and socket programming to Go concurrency and distributed consensus (Raft).',
    link: 'https://github.com/mbits-ieee-cs/systems-roadmap',
    author: 'Joel Shaji & Joffin A.'
  },
  {
    id: 'res-deeplearning',
    title: 'PyTorch Deep Learning Lab Starter Notebooks',
    type: 'Starter Kit',
    category: 'AI',
    description: 'Clean, documented Jupyter notebooks demonstrating autograd, CNN backbones, and self-attention mechanisms with zero boilerplate.',
    link: 'https://github.com/mbits-ieee-cs/dl-starters',
    author: 'Devika R.'
  },
  {
    id: 'res-security',
    title: 'Offensive & Defensive Security Playground',
    type: 'Documentation',
    category: 'Cyber',
    description: 'Curated challenges on reverse engineering binaries, web injection vulnerabilities, and safe cryptographic primitives.',
    link: 'https://github.com/mbits-ieee-cs/sec-playground',
    author: 'Ananya S. Nair'
  },
  {
    id: 'res-xplore',
    title: 'Student Guide to IEEE Xplore Research & Literature Reviews',
    type: 'Paper Repository',
    category: 'General',
    description: 'How to utilize your IEEE student membership to query IEEE Xplore, formulate research queries, and structure LaTeX conference submissions.',
    link: 'https://ieeexplore.ieee.org',
    author: 'Dr. Binu K. Mathew'
  }
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    date: 'September 2026',
    title: 'Call for Student Submissions: Pulse 2026 Project Showcase',
    summary: 'Submit your original semester projects in Systems, AI, or Web Architecture for the main stage presentation at Pulse 2026. Peer review closes Oct 15.',
    badge: 'Call for Papers',
    actionUrl: '#events',
    actionText: 'View Guidelines'
  },
  {
    id: 'ann-2',
    date: 'September 2026',
    title: 'Bytes & Neurons Workshop: Registrations Now Live',
    summary: 'Limited to 40 workstations in Lab 2. Early registration gives immediate access to the pre-requisite Python environment docker container.',
    badge: 'Upcoming',
    actionUrl: '#events',
    actionText: 'Reserve Workstation'
  }
];
