import React, { useState, useEffect } from "react";

interface ImageUploadProps {
  onImagesChange: (images: string[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImagesChange }) => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  
  useEffect(() => {
    onImagesChange(images);
  }, [images, onImagesChange]);

  return (
    <div className="image-upload">
      <input type="file" multiple onChange={handleImageUpload} />
      <div className="preview">
        {images.map((image, index) => (
          <div key={index} className="image-preview">
            <img src={image} alt={`Preview ${index}`} />
            <button onClick={() => handleDeleteImage(index)}>×</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
