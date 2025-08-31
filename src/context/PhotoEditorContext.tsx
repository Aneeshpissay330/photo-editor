import React, { createContext, useContext, useState } from "react";

type Filters = {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  grayscale: boolean;
  sepia: boolean;
};

type PhotoEditorContextType = {
  image: string | null;
  setImage: (img: string | null) => void;
  filters: Filters;
  setFilters: (f: Filters) => void;
  resetFilters: () => void;
};

const defaultFilters: Filters = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  grayscale: false,
  sepia: false,
};

const PhotoEditorContext = createContext<PhotoEditorContextType | undefined>(
  undefined
);

export const PhotoEditorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const resetFilters = () => setFilters(defaultFilters);

  return (
    <PhotoEditorContext.Provider
      value={{ image, setImage, filters, setFilters, resetFilters }}
    >
      {children}
    </PhotoEditorContext.Provider>
  );
};

export const usePhotoEditor = () => {
  const ctx = useContext(PhotoEditorContext);
  if (!ctx) throw new Error("usePhotoEditor must be used within provider");
  return ctx;
};
