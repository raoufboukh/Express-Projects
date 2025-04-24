const DoctorsCommune = ({ user, item, i }: any) => {
  return (
    user.commune == item.commune && (
      <div className="text-white bg-gray-800 p-4 rounded-md shadow-md flex md:justify-between justify-center gap-5 flex-wrap sm:px-10 sm:text-base text-sm">
        <div className="flex flex-col justify-between md:w-fit w-full">
          <p>
            <span className="text-gray-300">Username: </span>
            {item.username.charAt(0).toUpperCase() + item.username.slice(1)}
          </p>
          <p>
            <span className="text-gray-300">Email: </span>
            {item.email}
          </p>
          <p>
            <span className="text-gray-300">Time: </span>
            {i % 2 !== 0 ? "20:00 - 08:00" : "08:00 - 20:00"}
          </p>
        </div>
      </div>
    )
  );
};

export default DoctorsCommune;
