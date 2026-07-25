import { useMemo, useState ,useEffect} from "react";
import { getProducts,createProductVariant } from "../api/productApi";
import axiosClient from "../../../../api/axiosClient";


export default function NewProductVariantForm() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
    sku: "",
    size: "",
    price: {
      original:"",
      sale:"",
      currency:"INR"
    },

    stockQuantity: "",
  });

  useEffect(()=>{
    
          const fetchProducts = async()=> {
              try{
  
                   const products = await getProducts();
                   setProducts(products);
                console.log("products",products);
              }
              catch(error){
                  console.log(error);
              }   
          }
          fetchProducts();
      },[]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      alert("Please select a product.");
      return;
    }

    const payload = {
      productId: selectedProduct._id,
      ...formData,
    };
    const res = await createProductVariant(payload);

    console.log("payload",payload);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-6 text-3xl font-bold">
          Create Product Variant
        </h1>

        {/* Product Search */}
        <div className="mb-6">
          <label className="mb-2 block font-medium">
            Search Product
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product..."
            className="w-full rounded-lg border p-3"
          />
        </div>

        {/* Product Results */}
        {!selectedProduct && search && (
          <div className="mb-6 max-h-64 overflow-y-auto rounded-lg border">
            {filteredProducts.map((product) => (
              <button
                key={product._id}
                type="button"
                onClick={() => {
                  setSelectedProduct(product);
                  setSearch("");
                }}
                className="w-full border-b p-4 text-left hover:bg-gray-100"
              >
                <p className="font-medium">
                  {product.title}
                </p>

                <p className="text-sm text-gray-500">
                  {product.category}
                </p>
              </button>
            ))}

            {filteredProducts.length === 0 && (
              <p className="p-4 text-gray-500">
                No products found.
              </p>
            )}
          </div>
        )}

        {/* Selected Product */}
        {selectedProduct && (
          <div className="mb-6 rounded-lg bg-green-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {selectedProduct.title}
                </p>

                <p className="text-sm text-gray-600">
                  {selectedProduct.category}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="text-red-500"
              >
                Change
              </button>
            </div>
          </div>
        )}

        {/* Variant Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block font-medium">
              SKU
            </label>

            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          

          <div>
            <label className="mb-2 block font-medium">
              Size
            </label>

            <select
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >
              <option value="">Select Size</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Original Price
            </label>

            <input
              type="number"
              name="originalPrice"
              value={formData.price.original}
              onChange={(e)=> {
                setFormData({
                  ...formData,
                    price:{
                      ...formData.price,
                        original:e.target.value
                    }
                })
              }}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Sale Price
            </label>

            <input
              type="number"
              name="salePrice"
              value={formData.price.sale}
              onChange={(e)=> {
                setFormData({
                  ...formData,
                  price:{
                    ...formData.price,
                    sale:e.target.value
                  }
                })
              }}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Stock Quantity
            </label>

            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-3 text-white"
          >
            Create Variant
          </button>
        </form>
      </div>
    </div>
  );
}