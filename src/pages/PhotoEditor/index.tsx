import ControlsPanel from "../../components/ControlsPanel";
import ImagePreview from "../../components/ImagePreview";
import UploadPanel from "../../components/UploadPanel";
import { PhotoEditorProvider } from "../../context/PhotoEditorContext";

const PhotoEditor = () => {
  return (
    <PhotoEditorProvider>
      <main className="flex">
        <UploadPanel />
        <ImagePreview />
        <ControlsPanel />
      </main>
    </PhotoEditorProvider>
  )
}

export default PhotoEditor;