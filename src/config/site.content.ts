import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Media release newsroom',
  },
  footer: {
    tagline: 'Distribution, visibility, and newsroom credibility',
  },
  hero: {
    badge: 'Press distribution',
    title: ['Publish, distribute, and track press media that get noticed.'],
    description:
      'PressNBCNews helps teams publish editorial-quality releases, place stories across media channels, and monitor campaign visibility from one workflow.',
    primaryCta: {
      label: 'Browse latest releases',
      href: '/updates',
    },
    secondaryCta: {
      label: 'View pricing',
      href: '/pricing',
    },
    searchPlaceholder: 'Search release topics',
    focusLabel: 'Featured',
    featureCardBadge: 'launch note',
    featureCardTitle: 'Launch campaigns with newsroom-ready formatting and faster distribution.',
    featureCardDescription:
      'Use a modern media workflow to move from draft to publication while keeping every release discoverable and shareable.',
  },
  home: {
    metadata: {
      title: 'Press media distribution and media newsroom',
      description:
        'Explore the latest press media, media announcements, and business updates published on PressNBCNews.',
      openGraphTitle: 'Press media distribution and media newsroom',
      openGraphDescription:
        'A modern media publishing experience for announcements, company updates, and distributed press media.',
      keywords: ['press media distribution', 'latest news', 'business announcements', 'media outreach'],
    },
    introBadge: 'Platform',
    introTitle: 'A media-first workflow for publishing and distribution.',
    introParagraphs: [
      'PressNBCNews is built for founders, PR teams, and agencies that need to publish releases quickly without sacrificing editorial presentation.',
      'Every release page balances readability, trust signals, and search discoverability so visitors can scan and share updates faster.',
      'The interface keeps publishing workflows straightforward while still looking like a polished SaaS media product.',
    ],
    sideBadge: 'Core outcomes',
    sidePoints: [
      'Faster distribution of release content.',
      'Clear analytics and performance visibility.',
      'Scannable newsroom archive and search.',
      'Trust-first editorial presentation for every article.',
    ],
    primaryLink: {
      label: 'Open latest news',
      href: '/updates',
    },
    secondaryLink: {
      label: 'Talk to our team',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Start now',
    title: 'Choose a press media plan that matches your distribution goals.',
    description:
      'From startup announcements to enterprise campaigns, our platform supports publication, distribution, and reporting in one place.',
    primaryCta: {
      label: 'Compare pricing',
      href: '/pricing',
    },
    secondaryCta: {
      label: 'View latest releases',
      href: '/updates',
    },
  },
  taskSectionHeading: 'Latest press media',
  taskSectionDescriptionSuffix: 'Read the newest stories from the media desk.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Latest news',
    description: 'Read recent press media, product launches, and media updates.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Latest news',
    paragraphs: [
      'Browse fresh press media, campaign announcements, and editorial updates from companies and communication teams.',
      'Use category, date, and keyword filters to scan the archive quickly and open any release in a full editorial view.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
    ],
  },
}
