import React, { useState } from "react";
import axios from "axios";
import ImageUpload from "./imageUpload";

const ItemForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !price || !description || images.length === 0) {
      alert("Please fill out all fields!");
      return;
    }

    try {
      const response = await axios.post("/api/flask/additem", {
        title,
        price,
        description,
        images,
        user_id: 1, // Replace with dynamic user ID if needed
      });

      if (response.status === 200) {
        alert("Item uploaded successfully!");
        // Reset form fields
        setTitle("");
        setPrice("");
        setDescription("");
        setImages([]);
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error: any) {
      console.error("Error while uploading items:", error);
      // Handle error messages from server or network issues
      if (error.response) {
        alert(`Server error: ${error.response.data.message || "Unknown error"}`);
      } else {
        alert("Network error: Unable to reach the server.");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6">Upload Items</h2>

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Item title"
          required
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
          Price
        </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Item Price"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Write description"
          rows={4}
          required
        />
      </div>

      {/* Image Upload */}
      <ImageUpload onImagesChange={setImages} />

      {/* Submit button */}
      <button
        type="submit"
        className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Upload Item
      </button>
    </form>
  );
};

export default ItemForm;
