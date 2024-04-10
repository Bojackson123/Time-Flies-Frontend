import VideoUploadRecent from "components/video-upload-recent";

export const metadata: Metadata = {
  title: "Video",
  datePublished: "1/1/2023",
  breadcrumbs: [{ name: "Video", href: "/video" }],
};

export default function Home() {
  return (
    <main>
      <VideoUploadRecent />
    </main>
  );
}
