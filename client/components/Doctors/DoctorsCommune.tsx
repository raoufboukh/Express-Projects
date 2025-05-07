const DoctorsCommune = ({ user, item, i }: any) => {
  console.log("user.region", user.region);
  console.log("item.region", item.region);

  return (
    user.region.toLowerCase() == item.region.toLowerCase() && (
      <div className="text-white bg-gray-800 p-4 rounded-md shadow-md flex md:justify-between justify-center gap-5 flex-wrap sm:px-10 sm:text-base text-sm">
        <div className="flex flex-col justify-between md:w-fit w-full">
          <p>
            <span className="text-gray-300">Full Name: </span>
            {item.username.charAt(0).toUpperCase() + item.username.slice(1)}
          </p>
          <p>
            <span className="text-gray-300">Phone Number: </span>
            {item.number}
          </p>
          {user && user.role === "admin" && (
            <p>
              <span className="text-gray-300">Region: </span>
              {item.region}
            </p>
          )}
          <p>
            <span className="text-gray-300">Commune: </span>
            {item.commune}
          </p>
          <p>
            <span className="text-gray-300">Opening Times: </span>
            {item.startDay} / {item.endDay} - from {item.startTime} to{" "}
            {item.endTime}
          </p>
        </div>
      </div>
    )
  );
};

export default DoctorsCommune;
