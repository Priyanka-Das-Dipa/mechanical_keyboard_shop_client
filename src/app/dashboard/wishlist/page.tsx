"use client";
import WishlistCard from "@/src/components/wishlist/WishlistCard";
import { removeFromWishlist } from "@/src/redux/features/wishlist/wishlistSlice";
import { useAppSelector } from "@/src/redux/store/hooks";
import { useDispatch } from "react-redux";

export default function WishList() {
  const dispatch = useDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist?.items ?? []);

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (productId: string) => {
    // TODO: Add your cart logic here
    alert(`Product ${productId} added to cart!`);
    // dispatch(addToCart(...));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">♡</div>
        <h2 className="text-2xl font-medium text-gray-900 mb-2">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-500 mb-6">Save your favorite items here</p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
        >
          Browse Products
        </button>
      </div>
    );
  }
  return (
    <div className="px-5 ">
      <div className="mb-8 ml-5">
        <h1 className="text-3xl font-semibold text-gray-900">My Wishlist</h1>
        <p className="text-gray-500 mt-1">
          {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
        {wishlistItems.map((item) => (
          <WishlistCard
            key={item.productId}
            productId={item.productId}
            name={item.name}
            price={item.price}
            image={item.image}
            brand={item.brand}
            onRemove={handleRemoveFromWishlist}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
