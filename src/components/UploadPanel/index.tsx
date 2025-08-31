import { Button } from "@Aneeshpissay330/components-ui"
import { useRef } from "react";
import { usePhotoEditor } from "../../context/PhotoEditorContext";

const UploadPanel = () => {
    const { setImage } = usePhotoEditor();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleClick = () => {
        fileInputRef.current?.click(); // trigger hidden input
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
    };

    return (
        <section
            id="upload-panel"
            className="w-80 bg-gray-50 border-r border-gray-200 p-8"
        >
            <div className="space-y-6">
                <h2 className="text-lg font-semibold text-black dot-matrix">
                    Upload Image
                </h2>
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                    id="upload-area"
                    onClick={handleClick}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />

                    <div className="space-y-4">
                        <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-3xl">
                                cloud_upload
                            </span>
                        </div>
                        <div>
                            <p className="text-gray-600 font-medium">Drop your image here</p>
                            <p className="text-sm text-gray-500 mt-1">or click to browse</p>
                        </div>
                        <Button>Choose File</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UploadPanel