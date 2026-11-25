import { VideoBlockData } from "@/lib/types/caseStudy";

export default function VideoBlock({ data }: { data: VideoBlockData }) {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-16 sm:py-20">
      {data.heading && (
        <h3 className="text-[28px] sm:text-[36px] font-[800] tracking-[-0.03em] text-[#F4F2ED] mb-8">
          {data.heading}
        </h3>
      )}

      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.12] bg-[#11141A] shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
        <video
          src={data.video.src}
          poster={data.video.poster}
          controls={data.video.controls ?? true}
          autoPlay={data.video.autoplay ?? false}
          muted={data.video.muted ?? true}
          loop={data.video.loop ?? false}
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      {data.caption && (
        <p className="mt-3 text-center text-[12px] font-mono text-[#8E9098]">
          {data.caption}
        </p>
      )}
    </div>
  );
}
