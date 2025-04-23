import React from "react";

const ListDoctors = ({ user, item, mutate }: any) => {
  return (
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
      </div>
      {user && user.role === "admin" && (
        <button
          className="cursor-pointer bg-red-500 text-white px-3 rounded-md py-2"
          onClick={() => mutate({ id: item._id, role: item.role })}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ListDoctors;
