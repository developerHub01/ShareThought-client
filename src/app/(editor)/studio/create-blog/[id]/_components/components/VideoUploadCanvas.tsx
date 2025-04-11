import { VideoIcon } from "@/lib/icons";

const VideoUploadCanvas = () => {
  return (
    <div className="select-none flex flex-col justify-center items-center gap-3 p-8 bg-accent/80 text-center">
      <VideoIcon size={50} />
      <p>Add YouTube Video URL</p>
    </div>
  );
};

export default VideoUploadCanvas;
