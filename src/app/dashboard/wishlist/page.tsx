"use client";
import WishlistCard from "@/src/components/wishlist/WishlistCard";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "@/src/redux/features/user/userApi";
import toast from "react-hot-toast";

export default function WishList() {
  const { data: wishlistItems = [], isLoading } = useGetWishlistQuery();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const handleRemoveFromWishlist = async (productId: string) => {
    await removeFromWishlist(productId);
  };

  const handleAddToCart = (productId: string) => {
    toast.success(`Add to cart logic here: ${productId}`);
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
    <div className="">
      <h1 className="text-3xl text-black font-semibold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {wishlistItems.map((item) => (
          <WishlistCard
            key={item?._id}
            productId={item?._id}
            name={item?.name}
            price={item?.price}
            images={item?.images}
            brand={item?.brand}
            onRemove={handleRemoveFromWishlist}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
