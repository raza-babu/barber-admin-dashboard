import placeholder from "../../assets/placeholder_img.png";
export const ShopPhoto = ({ singleBarber }) => {
  const shopImages = singleBarber?.data?.shopImages || [];
  return (
    <div>
      <div className="mt-5">
        <h3 className="text-lg font-semibold mb-2">Barber Photos</h3>
        {shopImages?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {shopImages.map((image) => (
              <img
                key={image}
                src={image || placeholder}
                alt="Haircut 1"
                className="w-full h-95 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = placeholder;
                }}
              />
            ))}
          </div>
        ) : (
          <h1>There is no shop images.</h1>
        )}
      </div>
    </div>
  );
};
