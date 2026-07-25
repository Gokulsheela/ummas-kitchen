import { FaTrash } from "react-icons/fa6";
const API_URL = import.meta.env.VITE_API_URL;
export default function CartItem({
  item,
  onQuantityChange,
  onRemove,
  onSelect,
}) {
  const {
   cartQuantity,
    selected,
    variant,
  } = item;

  const {
    size,
    color,
    price,
    product,
  } = variant;

  // const discount =
  //   price.original > price.sale
  //     ? Math.round(
  //         ((price.original - price.sale) / price.original) * 100
  //       )
  //     : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">

      {/* Top Row */}
      <div className="flex justify-between items-start">

        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(item)}
          className="mt-1 w-5 h-5 accent-black"
        />

        <button
          onClick={() => onRemove(item.variant._id)}
          className="text-gray-400 hover:text-red-500"
        >
          <FaTrash size={18} />
        </button>

      </div>

      {/* Product Info */}
      <div className="flex mt-3 gap-4">

        <img
        src={`${API_URL}${item.variant.productId.gallery[0].url}`}
          alt={item.variant.productId.title}
          className="w-24 h-24 rounded-lg object-cover border"
        />

        <div className="flex-1">

          <h2 className="font-semibold text-base">
            {item.variant.productId.title}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {color} | Size {size}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2 mt-3">

            <span className="font-bold text-lg">
              AED {price.sale}
            </span>

            {price.original > price.sale && (
              <>
                <span className="text-gray-400 line-through text-sm">
                  AED {price.original}
                </span>

                {/* <span className="text-red-500 text-sm font-medium">
                  {discount}% OFF
                </span> */}
              </>
            )}

          </div>

          {/* cartQuantity */}
          <div className="flex items-center mt-4">

            <button
              onClick={() =>
                onQuantityChange(item, cartQuantity - 1)
              }
              disabled={cartQuantity === 1 }
              className="w-8 h-8 border rounded-l-lg"
            >
              -
            </button>

            <span className="w-10 text-center border-y h-8 flex items-center justify-center">
              {cartQuantity}
            </span>

            <button
                 disabled={cartQuantity>= item.variant.stockQuantity}

              onClick={() =>
                onQuantityChange(item, cartQuantity + 1,item.variant.stockQuantity)
              }
              className="w-8 h-8 border rounded-r-lg"
            >
              +
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}