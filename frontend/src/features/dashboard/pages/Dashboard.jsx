import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Product",
      description: "Create a new product",
      path: "/admin/products/new",
      icon: "📦",
    },
    {
      title: "Add Category",
      description: "Create a category",
      path: "/admin/categories/new",
      icon: "🗂️",
    },
    {
      title: "Add Variant",
      description: "Add product variants",
      path: "/admin/variants/new",
      icon: "🎨",
    },
    {
      title: "View Orders",
      description: "Manage customer orders",
      path: "/admin/orders",
      icon: "🛒",
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-xl font-bold">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <button
            key={action.title}
            onClick={() => navigate(action.path)}
            className="rounded-xl border p-5 text-left transition hover:border-black hover:shadow-md"
          >
            <div className="mb-3 text-3xl">
              {action.icon}
            </div>

            <h3 className="font-semibold">
              {action.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}