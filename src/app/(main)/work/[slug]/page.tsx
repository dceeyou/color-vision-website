import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getAllCaseStudySlugs } from "@/lib/wordpress/api";
import ProjectHero from "@/components/case-study/ProjectHero";
import BlockRenderer from "@/components/case-study/BlockRenderer";
import NextProjectNav from "@/components/case-study/NextProjectNav";
import LockedCaseStudy from "@/components/case-study/LockedCaseStudy";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static routes for all demo and CMS projects
export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate SEO and OpenGraph metadata per project
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getCaseStudyBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found — Color Vision",
      description: "The requested project case study could not be located.",
    };
  }

  const title = project.seoTitle || `${project.title} — Case Study | Color Vision`;
  const description = project.seoDescription || project.shortDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: project.heroImage?.src ? [{ url: project.heroImage.src }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.heroImage?.src ? [project.heroImage.src] : [],
    },
  };
}

// Dynamic Case Study Page Template
export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getCaseStudyBySlug(slug);

  if (!project) {
    notFound();
  }

  // Intercept locked projects (Coming Soon or non-navigable Concept presentations)
  if (
    project.status === "COMING_SOON" ||
    (project.status === "CONCEPT" && !project.hasPresentation)
  ) {
    return <LockedCaseStudy project={project} />;
  }

  return (
    <article className="min-h-screen bg-[#08090D] text-[#F4F2ED] selection:bg-[#FF5108] selection:text-[#08090D]">
      {/* 01. Dynamic Project Hero */}
      <ProjectHero project={project} />

      {/* 02. Flexible Dynamic Section Builder */}
      <BlockRenderer blocks={project.sections} />

      {/* 03. Editorial Next Project Transition */}
      <NextProjectNav nextProject={project.nextProject} />
    </article>
  );
}
