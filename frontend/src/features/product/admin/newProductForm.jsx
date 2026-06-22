import { useState } from "react";
import { createProduct } from "../api";

export default function NewProductForm() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    category: "",
    brand: "ummas'kitchen",
    tags: "",
    material: "100% cotton",
    careInstructions: "Machine wash cold. Do not bleach.",
    gender: "",
    collections: "summer 2026,Streetwear",
    seo: "",
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);

  const handleChange = (e) => {
    setFormData((curr) => ({
      ...curr,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    data.append(key, value);
  });

  if (thumbnail) {
    data.append("thumbnail", thumbnail);
  }

  gallery.forEach((file) => {
    data.append("gallery", file);
  });

  try {
    const response = await createProduct(
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-8 text-3xl font-bold">
          Create New Product
        </h1>

        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block font-medium">
              Product Name
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="product-slug"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Short Description
            </label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              rows="3"
              placeholder="Short Description"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Full Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Product Description"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                Category ID
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select Category</option>
                <option value="Men">Men Category</option>
                <option value="Women">Women Category</option>
                <option value="Kids">Kids Category</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="summer, cotton, oversized"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Thumbnail URL
            </label>
            <input
              type="file"
              name="thumbnail"
              accept="image/"
              value={formData.thumbnail}
              onChange={(e)=>{
                setThumbnail(e.target.files[0]);
              }}
              placeholder="choose your file"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Gallery Images
            </label>
            <input
              name="images"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) =>
                    setGallery(Array.from(e.target.files))
                 }
              placeholder="Image URLs"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                Material
              </label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select Gender</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Care Instructions
            </label>
            <textarea
              name="careInstructions"
              value={formData.careInstructions}
              onChange={handleChange}
              rows="3"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Collections
            </label>
            <input
              type="text"
              name="collections"
              value={formData.collections}
              onChange={handleChange}
              placeholder="Summer 2026, Streetwear"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              SEO Meta Description
            </label>
            <textarea
              name="seo"
              value={formData.seo}
              onChange={handleChange}
              rows="3"
              placeholder="SEO Description"
              className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:opacity-90"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}