const ItemHotelsSkeleton = () => {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm animate-pulse">
      {/* Image placeholder */}
      <div className="h-[88px] w-full bg-gray-200" />

      {/* Footer label placeholder */}
      <div className="px-2 py-1.5 border-t border-gray-100">
        <div className="h-2.5 bg-gray-200 rounded-full w-3/4" />
      </div>
    </div>
  );
};

export default ItemHotelsSkeleton;