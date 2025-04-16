import ImageList from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/Left/ImageList";
import ImageMain from "@/app/studio/create-community-post/_components/ContextBasedCanvas/ImageCanvas/Right/ImageMain";

const ImageModifierCanvas = () => {
  return (
    <div className="w-full h-full min-h-40 flex">
      <ImageList />
      <ImageMain />
    </div>
  );
};

export default ImageModifierCanvas;
