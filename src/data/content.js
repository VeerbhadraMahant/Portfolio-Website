// Single source of truth: every claim below comes from the resume PDF.

export const person = {
  name: ['Veerbhadra', 'Mahant'],
  summary:
    'Software developer in Pune. I build full-stack and AI systems, then measure them: load tests, test suites and CI, not just demos.',
  email: 'veerbhadramahant59@gmail.com',
  site: 'veerbhadra-mahant.me',
  location: 'Pune, India',
  links: {
    github: 'https://github.com/VeerbhadraMahant',
    linkedin: 'https://www.linkedin.com/in/veerbhadramahant',
    leetcode: 'https://leetcode.com/u/Veerbhadra_Mahant',
  },
  resume: '/Veerbhadra_Mahant_Resume.pdf',
}

// star: position (percent) of the project's star on the constellation map
export const projects = [
  {
    id: 'loanloop',
    star: { x: 18, y: 42 },
    headline: 'p95 33 ms at 1,000 concurrent calls',
    name: 'Loanloop',
    subtitle: 'Secure voice service desk for a lender',
    result: 'p95 latency 33 ms, 0 errors across 18,900 requests on 1,000 concurrent calls.',
    points: [
      'An 11-language voice agent that completes borrower requests end to end.',
      'A gateway that enforces call auth, secret scrubbing, four verification tiers and audit logs.',
      'Load-tested with Locust on 1,000 concurrent calls.',
    ],
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Next.js', 'Docker', 'Ollama (Qwen3-8B)', 'Locust', 'pytest'],
    repo: 'https://github.com/VeerbhadraMahant/loanloop',
  },
  {
    id: 'fee-nance',
    star: { x: 42, y: 14 },
    headline: '54 endpoints, 31 SQL functions',
    name: 'Fee-nance',
    subtitle: 'Personal finance and group bill splitting',
    result: '54 REST endpoints on an 11-table Postgres schema with row-level security.',
    points: [
      'Moved analytics and transactional group writes into 31 SQL functions.',
      'Redis caching with versioned invalidation.',
      'CI verifies every migration and policy.',
    ],
    stack: ['Next.js 16', 'TypeScript', 'Supabase Postgres', 'Redis (Upstash)', 'Zod', 'Google OAuth', 'GitHub Actions'],
    repo: 'https://github.com/VeerbhadraMahant/fee-nance',
  },
  {
    id: 'matrusetu',
    star: { x: 64, y: 56 },
    headline: '170+ tests, end-to-end in CI',
    name: 'Matrusetu',
    subtitle: 'Clinic software suite for OB-GYN practices',
    result: '170+ unit tests and Playwright end-to-end tests running in CI.',
    points: [
      'Registry, antenatal scheduling, OPD register, risk scoring and clinic analytics.',
      'AI consultation scribe, voice-to-vitals, OCR and a multilingual WhatsApp bot.',
      'Clinic-scoped row-level security and offline-first sync.',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase (Postgres, Auth, Storage)', 'Gemini', 'Sarvam STT', 'Tesseract.js', 'Vitest', 'Playwright'],
    repo: 'https://github.com/VeerbhadraMahant/Matruseva',
  },
  {
    id: 'freightsight',
    star: { x: 82, y: 26 },
    headline: 'Costs nothing when idle',
    name: 'Freightsight',
    subtitle: 'Freight forecasting and live vessel tracking',
    result: 'Live vessel relay on Cloudflare Durable Objects that costs nothing when idle.',
    points: [
      'Tracks each shipment’s vessel, live position, ETA and delivered cost per tonne.',
      'Freight forecasts validated with rolling-origin back-tests.',
      'Runs fully on free tier.',
    ],
    stack: ['FastAPI', 'pandas / statsmodels', 'React + TypeScript', 'Leaflet', 'Cloudflare Workers (Durable Objects)', 'Supabase Postgres'],
    repo: 'https://github.com/VeerbhadraMahant/Fresight',
  },
]

export const experience = [
  {
    role: 'Software Developer Intern (two terms)',
    org: 'BHSSYEN Pvt. Ltd., remote',
    when: 'Oct 2025 to Mar 2026; May 2026 to Jun 2026',
    points: [
      'Built a Python and Playwright automation platform for Excel-driven client workflows.',
      'Added retries, logging and recovery flows across concurrent, isolated browser sessions.',
      'Built an AI workflow that turns a hiring firm’s test results into reports in under 2 minutes, designed for 1,000 req/s.',
    ],
  },
]

export const leadership = [
  {
    role: 'Technical Lead',
    org: 'Microsoft Learn Student Community (MLSC), PCCOE',
    when: 'Jul 2026 to May 2027',
    points: [
      'Manages a 50-member team with technical oversight of all club projects and events.',
      'Conducted multiple workshops for B.Tech students; ran hackathons with 2,000+ participants.',
    ],
  },
  {
    role: 'AI and Data Science Executive',
    org: 'Microsoft Learn Student Community (MLSC), PCCOE',
    when: 'Jul 2025 to May 2026',
    points: [
      'Designed and managed hands-on AIML, data science and full-stack projects with fellow students.',
      'Ran technical systems and judging for the Techfest Praxis and Bluebit 2026 hackathons.',
    ],
  },
  {
    role: 'Technical Executive',
    org: 'International Relations Cell, PCCOE',
    when: 'Oct 2024 to Sep 2025',
    points: ['Ran tech operations for Know Japan 2025 and Explore Germany 2025.'],
  },
]

export const recognition = [
  {
    place: '1st',
    title: 'Synapse 1.0',
    org: 'Symbiosis Institute of Technology, Pune',
    when: 'Sep 2026',
    note: 'First of 30+ teams in finance; built a security-first anonymous feedback app.',
  },
  {
    place: '1st',
    title: 'AiMSA x GfG Web Sprint',
    org: 'PCCOE',
    when: 'Aug 2026',
    note: 'Only team to ship a fully deployed app with a live backend in 3 hours.',
  },
  {
    place: 'Finalist',
    title: 'Health-a-thon 2026',
    org: 'Koita Foundation and IIT Bombay',
    when: '2026',
    note: 'Top 30 of 450+ teams; built Matrusetu for OB-GYN clinics.',
  },
  {
    place: 'Finalist',
    title: 'International Innovation Challenge 3.0',
    org: 'Manipal University Jaipur',
    when: 'Sep 2026',
    note: 'Top 20 of 700 teams; built Prana 3D, turning MRI/CT scans into 3D models.',
  },
]

export const skills = [
  { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Java', 'SQL'] },
  {
    group: 'Backend and data',
    items: ['FastAPI', 'Node.js', 'REST APIs', 'PostgreSQL (Supabase, RLS)', 'Redis', 'MongoDB', 'MySQL'],
  },
  { group: 'Frontend', items: ['React 19', 'Next.js', 'Tailwind CSS', 'TanStack Query', 'Zustand', 'Electron'] },
  {
    group: 'Testing and DevOps',
    items: ['pytest', 'Vitest', 'Playwright', 'Locust', 'Docker', 'GitHub Actions (CI)', 'Cloudflare Workers', 'Vercel', 'Git'],
  },
]

export const education = {
  degree: 'B.E. Information Technology',
  school: 'Pimpri Chinchwad College of Engineering (PCCOE), Pune',
  when: 'Aug 2024 to May 2028 (expected)',
  coursework: 'DSA, OOP, DBMS, Operating Systems, Computer Networks, Software Engineering',
}
