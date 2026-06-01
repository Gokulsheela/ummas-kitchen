import useBottomNavVisibility from "../../../../hooks/useBottomNavVisibility";

import {
  House,
  Search,
  Heart,
  ShoppingBag,
  User
} from "lucide-react";

export default function BottomNav() {

  const visible = useBottomNavVisibility();

  return (

    <nav
      className={`
        fixed bottom-0 left-0 z-50
        flex h-16 w-full items-center justify-around
        border-t border-gray-200 bg-white
        transition-transform duration-300 ease-in-out
        pb-[env(safe-area-inset-bottom)] md:hidden
        ${visible ? "translate-y-0" : "translate-y-full "}
      `}
    >

      <button>
        <House size={24} />
      </button>

      <button>
        <Search size={24} />
      </button>

      <button>
        <Heart size={24} />
      </button>

      <button className="relative">

        <ShoppingBag size={24} />

        <span
          className="
            absolute -right-2 -top-2
            flex h-5 w-5 items-center justify-center
            rounded-full bg-black text-xs text-white
          "
        >
          5
        </span>

      </button>

      <button>
        <User size={24} />
      </button>

    </nav>
  );
}