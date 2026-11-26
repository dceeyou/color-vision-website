export interface MediaItem {
  src: string;
  alt: string;
  caption?: string;
  mediaType?: "image" | "video" | "svg" | "lottie";
  aspectRatio?: string;
  width?: number;
  height?: number;
}

export interface VideoItem {
  src: string;
  poster?: string;
  alt?: string;
  caption?: string;
  aspectRatio?: string;
  controls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export interface RichTextBlockData {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  content: string[]; // Array of paragraphs or bullet points
  bullets?: string[];
  alignment?: "left" | "center";
}

export interface SingleImageBlockData {
  image: MediaItem;
  widthOption?: "standard" | "wide" | "compact";
  aspectRatio?: string;
}

export interface FullWidthImageBlockData {
  image: MediaItem;
  caption?: string;
  parallax?: boolean;
}

export interface ImageGalleryBlockData {
  eyebrow?: string;
  heading?: string;
  images: MediaItem[];
  layout: "2-column" | "3-column" | "carousel" | "masonry";
  caption?: string;
}

export interface VideoBlockData {
  video: VideoItem;
  heading?: string;
  caption?: string;
}

export interface AnimationBlockData {
  title?: string;
  description?: string;
  animationType: "lottie" | "css" | "interactive";
  assetUrl?: string;
}

export interface BeforeAfterBlockData {
  eyebrow?: string;
  heading?: string;
  description?: string;
  beforeImage: MediaItem;
  afterImage: MediaItem;
  beforeLabel?: string;
  afterLabel?: string;
  caption?: string;
}

export interface TwoColumnContentBlockData {
  layout: "text-left" | "text-right";
  eyebrow?: string;
  heading: string;
  content: string[];
  bullets?: string[];
  media: MediaItem;
  caption?: string;
}

export interface StatisticItem {
  value: string;
  label: string;
  description?: string;
}

export interface StatisticsBlockData {
  eyebrow?: string;
  heading?: string;
  items: StatisticItem[];
}

export interface QuoteBlockData {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: MediaItem;
}

export interface ProjectMetadataBlockData {
  client: string;
  industry: string;
  year: string;
  duration: string;
  services: string[];
  tools?: string[];
  liveUrl?: string;
}

export interface SpacerDividerBlockData {
  spacing?: "small" | "medium" | "large";
  showDivider?: boolean;
}

export type CaseStudyBlock =
  | { id: string; type: "rich_text"; data: RichTextBlockData }
  | { id: string; type: "single_image"; data: SingleImageBlockData }
  | { id: string; type: "full_width_image"; data: FullWidthImageBlockData }
  | { id: string; type: "image_gallery"; data: ImageGalleryBlockData }
  | { id: string; type: "video"; data: VideoBlockData }
  | { id: string; type: "animation"; data: AnimationBlockData }
  | { id: string; type: "before_after"; data: BeforeAfterBlockData }
  | { id: string; type: "two_column_content"; data: TwoColumnContentBlockData }
  | { id: string; type: "statistics"; data: StatisticsBlockData }
  | { id: string; type: "quote"; data: QuoteBlockData }
  | { id: string; type: "project_metadata"; data: ProjectMetadataBlockData }
  | { id: string; type: "spacer_divider"; data: SpacerDividerBlockData };

export interface CaseStudyProject {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  projectType: string;
  industry: string;
  client: string;
  year: string;
  duration: string;
  projectStatus: string;
  status?: "AVAILABLE" | "COMING_SOON" | "CONCEPT";
  statusNote?: string;
  hasPresentation?: boolean;
  featured: boolean;
  displayOrder: number;

  categories: string[];
  services: string[];
  toolsAndTechnologies: string[];
  projectTeam: { role: string; name: string }[];
  projectCredits: { label: string; value: string }[];

  thumbnailImage: MediaItem | null;
  heroImage: MediaItem | null;
  heroVideo?: VideoItem | null;
  galleryImages: MediaItem[];
  clientLogo?: MediaItem | null;
  socialShareImage?: MediaItem | null;

  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
  canonicalUrl?: string;
  robots?: string;

  sections: CaseStudyBlock[];
  relatedProjects?: { slug: string; title: string; category: string; thumbnail?: string }[];
  nextProject?: { slug: string; title: string; category: string; subtitle?: string; year?: string };
  previousProject?: { slug: string; title: string; category: string };
}
