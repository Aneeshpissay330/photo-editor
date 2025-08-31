import { usePhotoEditor } from "../../context/PhotoEditorContext";

const ImagePreview = () => {
  const { image, filters } = usePhotoEditor();

  const filterStyle = `
    brightness(${filters.brightness}%)
    contrast(${filters.contrast}%)
    saturate(${filters.saturation}%)
    blur(${filters.blur}px)
    grayscale(${filters.grayscale ? 100 : 0}%)
    sepia(${filters.sepia ? 100 : 0}%)
  `;

  return (
    <section
      id="image-preview"
      className="flex-1 bg-white flex items-center justify-center p-8"
    >
      <div className="max-w-4xl max-h-full flex items-center justify-center">
        {image ? (
          <div className="border border-gray-200 rounded-lg overflow-hidden shadow-lg">
            <img
              className="max-w-full max-h-[70vh] object-contain"
              src={image}
              alt="Uploaded preview"
              style={{ filter: filterStyle }}
            />
          </div>
        ) : (
          <div className="text-gray-400 text-lg">
            No image uploaded yet
          </div>
        )}
      </div>
    </section>
  );
};

export default ImagePreview;
