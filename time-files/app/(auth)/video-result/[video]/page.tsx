"use client";
import VideoFrame from "components/video-frame";
import { useParams } from "next/navigation";

const metadata: Metadata = {
  title: "Video Result",
  datePublished: "1/1/2023",
  breadcrumbs: [{ name: "Video Result", href: "/video-result/" }],
};

export default function Page() {
  const params = useParams<{ video: string; }>();
  // console.log('param', params.video)
  return (
    <main>
      <VideoFrame video={params.video} />
    </main>
  );
}