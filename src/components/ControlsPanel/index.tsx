import { Button } from "@Aneeshpissay330/components-ui";
import { usePhotoEditor } from "../../context/PhotoEditorContext";
import { useState } from "react";

const ControlsPanel = () => {
    const { filters, setFilters, resetFilters, image } = usePhotoEditor();
    const [format, setFormat] = useState<"jpg" | "png" | "webp">("jpg");

    const handleDownload = () => {
        if (!image) {
            alert("No image to download!");
            return;
        }

        const img = new Image();
        img.src = image;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // apply filters
            ctx.filter = `
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        saturate(${filters.saturation}%)
        blur(${filters.blur}px)
        grayscale(${filters.grayscale ? 100 : 0}%)
        sepia(${filters.sepia ? 100 : 0}%)
      `;

            ctx.drawImage(img, 0, 0, img.width, img.height);

            // export
            let mime = "image/jpeg";
            if (format === "png") mime = "image/png";
            if (format === "webp") mime = "image/webp";

            const link = document.createElement("a");
            link.download = `photo.${format}`;
            link.href = canvas.toDataURL(mime, 1.0); // 1.0 = high quality
            link.click();
        };
    };
    return (
        <section
            id="controls-panel"
            className="w-80 bg-gray-50 border-l border-gray-200 p-8 overflow-y-auto pb-15"
            style={{ height: "calc(100vh - 100px)" }}
        >
            <div className="space-y-8">
                <h2 className="text-lg font-semibold text-black dot-matrix">Adjustments</h2>
                {/* Filter Controls */}
                <div className="space-y-6">
                    {/* Brightness */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-gray-700">
                                Brightness
                            </label>
                            <span className="text-sm text-gray-500" id="brightness-value">
                                {filters.brightness}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={200}
                            value={filters.brightness}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            onChange={(e) => setFilters({ ...filters, brightness: Number(e.target.value) })}
                        />
                    </div>
                    {/* Contrast */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-gray-700">Contrast</label>
                            <span className="text-sm text-gray-500" id="contrast-value">
                                {filters.contrast}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={200}
                            value={filters.contrast}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            onChange={(e) => setFilters({ ...filters, contrast: Number(e.target.value) })}
                        />
                    </div>
                    {/* Saturation */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-gray-700">
                                Saturation
                            </label>
                            <span className="text-sm text-gray-500" id="saturation-value">
                                {filters.saturation}
                            </span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={200}
                            value={filters.saturation}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            onChange={(e) => setFilters({ ...filters, saturation: Number(e.target.value) })}
                        />
                    </div>
                    {/* Blur */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-gray-700">Blur</label>
                            <span className="text-sm text-gray-500" id="blur-value">
                                {filters.blur}px
                            </span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={10}
                            value={filters.blur}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            onChange={(e) => setFilters({ ...filters, blur: Number(e.target.value) })}
                        />
                    </div>
                    {/* Grayscale Toggle */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Grayscale</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={filters.grayscale}
                                onChange={(e) => setFilters({ ...filters, grayscale: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black" />
                        </label>
                    </div>
                    {/* Sepia Toggle */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700">Sepia</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={filters.sepia}
                                onChange={(e) => setFilters({ ...filters, sepia: e.target.checked })}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black" />
                        </label>
                    </div>
                </div>
                {/* Preset Filters */}
                {/* <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">Quick Filters</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="p-3 border border-gray-200 rounded-lg hover:border-black transition-colors text-sm font-medium">
                            Vintage
                        </button>
                        <button className="p-3 border border-gray-200 rounded-lg hover:border-black transition-colors text-sm font-medium">
                            B&amp;W
                        </button>
                        <button className="p-3 border border-gray-200 rounded-lg hover:border-black transition-colors text-sm font-medium">
                            Warm
                        </button>
                        <button className="p-3 border border-gray-200 rounded-lg hover:border-black transition-colors text-sm font-medium">
                            Cool
                        </button>
                    </div>
                </div> */}
                {/* Action Buttons */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                    <Button
                        fullWidth
                        leftIcon={<span className="material-symbols-outlined">rotate_left</span>}
                        onClick={resetFilters}
                    >
                        Reset
                    </Button>

                    <Button
                        fullWidth
                        leftIcon={<span className="material-symbols-outlined">download</span>}
                        onClick={handleDownload}
                    >
                        Download
                    </Button>
                </div>
                {/* Export Options */}
                <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-700">Export Format</h3>
                    <select
                        className="w-full p-3 border border-gray-200 rounded-lg focus:border-black focus:outline-none"
                        value={format}
                        onChange={(e) => setFormat(e.target.value as "jpg" | "png" | "webp")}
                    >
                        <option>JPG</option>
                        <option>PNG </option>
                        <option>WebP</option>
                    </select>
                </div>
            </div>
        </section>
    )
}

export default ControlsPanel;