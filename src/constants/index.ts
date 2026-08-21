export const APP_NAME = 'ClipAI'
export const APP_TAGLINE = 'AI video editing for social'
export const APP_VERSION = '0.0.0'

export const ROUTES = {
  home: '/',
  features: '/features',
  services: '/services',
  modes: '/modes',
  how: '/how',
  pricing: '/pricing',
  about: '/about',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  verifyEmail: '/verify-email',
  dashboard: '/app',
  newProject: '/app/projects/new',
  project: (id: string) => `/app/projects/${id}`,
  account: '/app/account',
  subscription: '/app/subscription',
  admin: '/admin',
  adminUsers: '/admin/users',
  adminUser: (id: string) => `/admin/users/${id}`,
  tools: '/#tools',
  pricingAnchor: '/#pricing',
  servicesAnchor: '/#services',
  howAnchor: '/#how',
} as const

export const NAV_LINKS = [
  { label: 'Features', to: ROUTES.features },
  { label: 'Services', to: ROUTES.services },
  { label: 'Modes', to: ROUTES.modes },
  { label: 'How it works', to: ROUTES.how },
  { label: 'Pricing', to: ROUTES.pricing },
  { label: 'About', to: ROUTES.about },
] as const

export const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    price: 20,
    edits: '50 edits / month',
    description: 'For creators posting a few times a week.',
    perks: [
      '50 successful renders / month',
      'Talking-head, rapid-cut & ASMR modes',
      'Captions, ratios & export options',
      'Email support',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 40,
    edits: '100 edits / month',
    description: 'Steady output for growing channels.',
    featured: true,
    perks: [
      '100 successful renders / month',
      'All editing modes & options',
      'Preview before download',
      'Priority processing when available',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    edits: '200 edits / month',
    description: 'High-volume short-form publishing.',
    perks: [
      '200 successful renders / month',
      'All modes, options & aspect ratios',
      'Retry eligible failed jobs free',
      'Faster turnaround when capacity allows',
    ],
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    price: 99,
    edits: 'Unlimited under fair use',
    description: 'For teams and daily publishers.',
    perks: [
      'Unlimited renders under fair use',
      'Team-friendly monthly ceiling',
      'All product features included',
      'Fair-use limits on duration & size',
    ],
  },
] as const

export const PRICING_FAQS = [
  {
    q: 'When is an edit credit used?',
    a: 'Only after a video processes successfully. Failed jobs never deduct a credit.',
  },
  {
    q: 'Can I change plans later?',
    a: 'Yes — upgrade, downgrade, or cancel anytime. Billing is handled through Stripe.',
  },
  {
    q: 'What is fair use on Unlimited?',
    a: 'Reasonable limits on video length, file size, and simultaneous jobs so the service stays reliable for everyone.',
  },
] as const

export const EDITING_MODES = [
  {
    id: 'talking-head',
    name: 'Talking-head',
    summary:
      'Silence out, jump cuts in, captions on — built for speech-driven footage.',
    details: [
      'Speech-to-text transcripts',
      'Pause detection & jump cuts',
      'Optional zoom punch-ins',
      'Basic auto captions',
    ],
  },
  {
    id: 'rapid-cut',
    name: 'Rapid-cut',
    summary:
      'Faster pacing for Reels and Shorts — keep the energy, drop the dead air.',
    details: [
      'Scene & motion analysis',
      'Audio-peak aware cuts',
      'Pacing presets: normal to very fast',
      'Optional speed changes',
    ],
  },
  {
    id: 'asmr',
    name: 'ASMR & unboxing',
    summary:
      'Preserve product reveals and texture sounds without relying on dialogue.',
    details: [
      'Hand & packaging motion cues',
      'Sound-peak preservation',
      'Reveal-moment emphasis',
      'Optional zoom & speed effects',
    ],
  },
] as const

export const HOW_STEPS = [
  {
    step: '01',
    title: 'Upload',
    text: 'Drop MP4, MOV, or WebM — up to 20 minutes of raw footage.',
  },
  {
    step: '02',
    title: 'Choose a mode',
    text: 'Talking-head, rapid-cut, or ASMR/unboxing — plus optional toggles.',
  },
  {
    step: '03',
    title: 'Download',
    text: 'Preview the edit, tweak the AI title, export social-ready MP4.',
  },
] as const

export const EDIT_OPTIONS = [
  {
    title: 'Auto captions',
    text: 'Generate captions from speech with a clean MVP caption style.',
  },
  {
    title: 'Aspect ratios',
    text: 'Export 9:16, 1:1, or 16:9 — default vertical for Reels and Shorts.',
  },
  {
    title: 'Speed ramps',
    text: 'Light to aggressive presets that keep key moments at normal speed.',
  },
  {
    title: 'Keyframe zooms',
    text: 'Speaker punch-ins and reveal zooms without a manual timeline.',
  },
] as const

export const PIPELINE_STEPS = [
  { status: 'Upload', detail: 'Validated formats & limits' },
  { status: 'Analyze', detail: 'Speech, scenes, sound peaks' },
  { status: 'Edit', detail: 'Cuts, captions, pacing' },
  { status: 'Render', detail: 'Social-ready MP4' },
] as const

/** Deeper job lifecycle — used on Services page only */
export const JOB_STATUSES = [
  {
    status: 'Uploaded',
    detail: 'Source file accepted; project created with your mode and options.',
  },
  {
    status: 'Queued',
    detail: 'Waiting for available processing capacity.',
  },
  {
    status: 'Analyzing',
    detail: 'Speech, scene, motion, or sound cues run based on mode.',
  },
  {
    status: 'Preparing edit',
    detail: 'Cuts, captions, speed, and framing assembled from analysis.',
  },
  {
    status: 'Rendering',
    detail: 'Output MP4 is encoded at your chosen aspect ratio.',
  },
  {
    status: 'Completed',
    detail: 'Preview ready; one edit credit used after success only.',
  },
  {
    status: 'Failed',
    detail: 'Job can be retried when eligible — no credit deducted.',
  },
] as const

/** Mode → AI services mapping — Services page */
export const SERVICE_MODE_MAP = [
  {
    mode: 'Talking-head',
    role: 'Speech-first footage',
    services: ['Speech analysis', 'Auto captions', 'Smart naming', 'Render & export'],
  },
  {
    mode: 'Rapid-cut',
    role: 'Energy & pacing',
    services: ['Scene & motion AI', 'Smart naming', 'Render & export'],
  },
  {
    mode: 'ASMR & unboxing',
    role: 'Product without dialogue',
    services: ['ASMR & product cues', 'Smart naming', 'Render & export'],
  },
] as const

/** Upload / output limits — Services page */
export const DELIVERABLE_LIMITS = [
  {
    title: 'Formats in',
    text: 'MP4, MOV, and WebM source files.',
  },
  {
    title: 'Upload limits',
    text: 'Up to 2 GB and 20 minutes of source footage per project.',
  },
  {
    title: 'Output',
    text: 'Social-ready MP4 up to 1080p — 9:16, 1:1, or 16:9.',
  },
  {
    title: 'Fair credits',
    text: 'One edit after a successful render. Failed jobs never use a credit.',
  },
] as const

/** Product capabilities — Features page (not AI service list) */
export const PRODUCT_FEATURES = [
  {
    title: 'Upload & validate',
    text: 'Drag-and-drop or browse — formats, size, and duration checked before the job starts.',
  },
  {
    title: 'Project workspace',
    text: 'Each job stores mode, options, aspect ratio, title, and output filename in one place.',
  },
  {
    title: 'Live status',
    text: 'Track uploaded, queued, analyzing, rendering, completed, and failed states.',
  },
  {
    title: 'Preview & download',
    text: 'Watch the finished cut, then grab the MP4 when you are happy.',
  },
  {
    title: 'Edit credits',
    text: 'See remaining edits from your plan. Successful renders only use credits.',
  },
  {
    title: 'Retry failed jobs',
    text: 'Eligible failures can be retried without losing an edit when processing fails.',
  },
] as const

export const AI_SERVICES = [
  {
    id: 'speech',
    title: 'Speech analysis',
    text: 'Transcripts, word timestamps, pause detection, and silence-based jump cuts.',
    how: 'Your audio is transcribed with timing. Long pauses become cut candidates while sentence flow stays intact for talking-head clips.',
    details: [
      'Speech-to-text with word-level timing',
      'Silence and pause detection',
      'Automatic jump cuts for talking-head',
      'Foundation for captions and naming',
    ],
  },
  {
    id: 'motion',
    title: 'Scene & motion AI',
    text: 'Detects activity, scene changes, and peaks to drive rapid-cut pacing.',
    how: 'Visual activity, scene changes, and audio peaks mark the moments to keep. Slow or empty stretches are shortened for Shorts energy.',
    details: [
      'Scene-change and motion cues',
      'Audio-peak aware pacing',
      'Presets from normal to very fast',
      'Built for Reels and Shorts energy',
    ],
  },
  {
    id: 'asmr',
    title: 'ASMR & product cues',
    text: 'Keeps reveals, hand motion, and important sounds for unboxing footage.',
    how: 'When dialogue is thin or missing, the engine leans on hand motion, packaging movement, reveals, and sound peaks instead of a transcript.',
    details: [
      'Hand and packaging motion cues',
      'Sound-peak preservation',
      'Reveal-moment emphasis',
      'Works without relying on dialogue',
    ],
  },
  {
    id: 'captions',
    title: 'Auto captions',
    text: 'Optional captions from speech with a standard social-ready style.',
    how: 'Captions are built from speech timing and burned into a clean MVP style you can turn on or off per project.',
    details: [
      'Generated from speech analysis',
      'Clean MVP caption style',
      'Toggle on or off per job',
      'Ready for vertical social video',
    ],
  },
  {
    id: 'naming',
    title: 'Smart naming',
    text: 'AI suggests a video title and clean output filename you can edit.',
    how: 'After analysis, ClipAI proposes a readable title and download name so projects stay organized — both stay editable.',
    details: [
      'Suggested title from content',
      'Clean download filename',
      'Editable before export',
      'Keeps projects organized',
    ],
  },
  {
    id: 'render',
    title: 'Render & export',
    text: 'Applies cuts, zooms, speed, and framing, then delivers downloadable MP4.',
    how: 'Approved cuts and options are applied, framed to your aspect ratio, then rendered to a downloadable social-ready MP4 with preview.',
    details: [
      'Applies cuts, zooms, and speed',
      'Aspect ratios: 9:16, 1:1, 16:9',
      'Up to 1080p social-ready MP4',
      'Preview before you download',
    ],
  },
] as const
