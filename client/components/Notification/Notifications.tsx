/* eslint-disable @typescript-eslint/no-explicit-any */
import { check } from "@/lib/dataFetching"
import { useQuery } from "@tanstack/react-query"

const Notifications = () => {
    const {data, isLoading} = useQuery({
    queryKey: ["notifications"],
    queryFn: check,
    })
  return (
    <div>
      {isLoading ? (
        <div className="text-white text-3xl">Chargement...</div>
      ) : data.notifications.length !== 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2 overflow-y-clip">
          {data.map((item: any, i: number) => (
            <div
              key={i}
              className="text-white bg-gray-800 p-4 rounded-md shadow-md flex flex-col justify-between px-10 sm:text-base text-sm"
            >
              <p>
                <span className="text-gray-300">Message: </span>
                {item.message}
              </p>
              <p>
                <span className="text-gray-300">date: </span>
                {item.appointment}
              </p>
              <p>
                <span className="text-gray-300">senderId: </span>
                {item.senderId}
              </p>
            </div>
          ))}
        </div>
      ): (
        <div className="text-white bg-gray-800 p-4 rounded-md">
          Aucune notification
        </div>
      )}
    </div>
  )
}

export default Notifications
