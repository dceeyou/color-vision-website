import { CaseStudyBlock } from "@/lib/types/caseStudy";
import RichTextBlock from "./RichTextBlock";
import SingleImageBlock from "./SingleImageBlock";
import FullWidthImageBlock from "./FullWidthImageBlock";
import ImageGalleryBlock from "./ImageGalleryBlock";
import VideoBlock from "./VideoBlock";
import AnimationBlock from "./AnimationBlock";
import BeforeAfterBlock from "./BeforeAfterBlock";
import TwoColumnContentBlock from "./TwoColumnContentBlock";
import StatisticsBlock from "./StatisticsBlock";
import QuoteBlock from "./QuoteBlock";
import ProjectMetadataBlock from "./ProjectMetadataBlock";
import SpacerDividerBlock from "./SpacerDividerBlock";

export default function BlockRenderer({ blocks }: { blocks: CaseStudyBlock[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="w-full">
      {blocks.map((block) => {
        switch (block.type) {
          case "rich_text":
            return <RichTextBlock key={block.id} data={block.data} />;
          case "single_image":
            return <SingleImageBlock key={block.id} data={block.data} />;
          case "full_width_image":
            return <FullWidthImageBlock key={block.id} data={block.data} />;
          case "image_gallery":
            return <ImageGalleryBlock key={block.id} data={block.data} />;
          case "video":
            return <VideoBlock key={block.id} data={block.data} />;
          case "animation":
            return <AnimationBlock key={block.id} data={block.data} />;
          case "before_after":
            return <BeforeAfterBlock key={block.id} data={block.data} />;
          case "two_column_content":
            return <TwoColumnContentBlock key={block.id} data={block.data} />;
          case "statistics":
            return <StatisticsBlock key={block.id} data={block.data} />;
          case "quote":
            return <QuoteBlock key={block.id} data={block.data} />;
          case "project_metadata":
            return <ProjectMetadataBlock key={block.id} data={block.data} />;
          case "spacer_divider":
            return <SpacerDividerBlock key={block.id} data={block.data} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
