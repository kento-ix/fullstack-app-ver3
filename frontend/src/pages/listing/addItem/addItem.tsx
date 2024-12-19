import React, { useState } from "react";
import ImageUpload from "./imageUpload";

const AddItem = () => {
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    console.log("Images:", images);
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Price", price);
  };

  // Reset form values
  const handleCancel = () => {
    setPrice(0);
    setImages([]);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ImageUpload onImagesChange={setImages} />

      <caption>Title</caption>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-1/2"
      />

      <caption>Price</caption>
      <input
        type="number"
        value={price === 0 ? "" : price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="border p-2"
        placeholder="0"
        style={{ appearance: "textfield" }} // Hides the spinner in most browsers
      />

      <caption>Description</caption>
      <textarea
        name="description"
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-1/2"
        minLength={0}
        maxLength={100}
      ></textarea>

      <div className="flex gap-4">
        <button
            className="p-3 rounded-md hover:opacity-80 transition duration-300 text-black bg-gray-300"
            onClick={handleCancel}
            type="button"
        >
          Cancle
        </button>

        <button
          className="p-3 rounded-md hover:opacity-80 transition duration-300 text-white bg-blue-500"
          onClick={(e) => handleSubmit}
        >
          Submit
        </button>
      </div>

      {/* Submit the form when pressing Enter */}
    </form>
  );
};

export default AddItem;
