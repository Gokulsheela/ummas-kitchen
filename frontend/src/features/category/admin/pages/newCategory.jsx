import { useState } from "react";
import { createProductCategory } from "../api/categoryApi";

export default function NewCategoryForm() {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    thumbnail:"",
    categoryId: "",
  });
  const [thumbnail, setThumbnail] = useState(null);

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

  try {
    const response = await createProductCategory(
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
        {/* <h1 className="mb-8 text-3xl font-bold">
          Create New Product
        </h1> */}

        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block font-medium">
              Product Name
            </label>
            <input
              type="text"
              name="name"
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

          <button
            type="submit"
            className="rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:opacity-90"
          >
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
}