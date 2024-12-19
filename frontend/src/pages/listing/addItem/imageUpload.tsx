import React, { useState } from "react";

interface ImageUploadProps {
  onImagesChange: (images: string[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesChange }) => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setImages((prevImages) => {
        const newImages = [...prevImages, ...imageUrls];
        onImagesChange(newImages); // Propagate image state change to parent
        return newImages;
      });
    }
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => {
      const newImages = prevImages.filter((_, i) => i !== index);
      onImagesChange(newImages); // Propagate updated image state to parent
      return newImages;
    });
  };

  return (
    <div className="flex gap-4 overflow-x-auto mt-4">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-1/4 h-40 border-2 border-dashed border-gray-400 cursor-pointer relative"
      >
        <p className="text-center text-gray-600">Add Photos or Drag and Drop</p>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="absolute inset-0 opacity-0"
        />
      </label>

      {images.map((imageUrl, index) => (
        <div key={index} className="relative w-1/4 h-40 flex-shrink-0">
          <img
            src={imageUrl}
            alt={`Preview ${index + 1}`}
            className="w-full h-full object-cover rounded"
          />
          <button
            type="button"
            onClick={() => handleDeleteImage(index)}
            className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-600"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageUpload;
