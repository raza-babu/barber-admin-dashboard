/* eslint-disable react/prop-types */

import placeholder from "../../assets/placeholder_img.png";

const BarberTiming = ({ singleBarber }) => {
  const barbers = singleBarber?.data?.barbers || [];
  const schedules = singleBarber?.data?.schedule || [];

  return (
    <div className=" max-w-5xl mt-7">
      {/* Shop Barber Section */}
      {barbers.length > 0 && (
        <>
          <h2 className="text-[#D17C51] font-semibold text-lg mb-4">
            Shop Barber
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {barbers.map((barber) => (
              <div
                key={barber.id}
                className="flex items-center border border-gray-300 rounded-lg"
              >
                <img
                  src={barber.Image || placeholder}
                  alt={barber.name}
                  className="w-42.5 h-30 rounded-tl rounded-bl object-cover"
                />
                <div className="ml-4 p-4">
                  <h3 className="font-semibold text-lg">{barber.name}</h3>
                  <span className="mt-1 px-3 py-1 bg-[#D17C51] text-white text-sm font-semibold rounded-md inline-block">
                    {`${barber.avgRating.toFixed(2)} (${barber.ratingCount})`} ★
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Shop Timings Section */}

      {singleBarber?.data?.schedule?.map((day, index) => (
        <div key={index}>
          <h2 className="font-semibold text-xl mt-8 mb-4">Shop Timings</h2>
          <div className="border-t border-gray-300">
            <div className="flex justify-between py-2 border-b">
              <span>{day?.dayName}</span>
              <span className="font-semibold">
                {day?.openingTime} - {day?.closingTime}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>{day?.isActive ? "Open" : "Close"}</span>
            </div>
          </div>
        </div>
      ))}

      {schedules.length > 0 ? (
        schedules?.map((day, index) => (
          <div key={index}>
            <h2 className="font-semibold text-xl mt-8 mb-4">Shop Timings</h2>
            <div className="border-t border-gray-300">
              <div className="flex justify-between py-2 border-b border-gray-600">
                <span>{day?.dayName}</span>
                <span className="font-semibold">
                  {day?.openingTime} - {day?.closingTime}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b ">
                <span>{day?.isActive ? "Open" : "Close"}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="mt-6">There is no timing available now</h1>
      )}
    </div>
  );
};

export default BarberTiming;
