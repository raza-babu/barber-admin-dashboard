const ShopService = ({ singleBarber }) => {
  const shopServices = singleBarber?.data?.services || [];
  return (
    <div>
      <div className="mt-5">
        <h3 className="text-lg font-semibold mb-2">Available Services</h3>
        {shopServices?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {shopServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200"
              >
                {/* Header with service name */}
                <div className="bg-sky-500 p-4">
                  <h3 className="text-lg font-bold text-white truncate">
                    {service.serviceName}
                  </h3>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Available To Badge */}
                  <div>
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {service.availableTo}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-3">
                    {/* Price */}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm font-medium">
                        Price
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        ${service.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="flex justify-between items-center pb-3">
                      <span className="text-gray-600 text-sm font-medium">
                        Duration
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {service.duration} min
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h1>There is no Service Available now.</h1>
        )}
      </div>
    </div>
  );
};

export default ShopService;
