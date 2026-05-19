import React from "react";
import auth from "../../auth/firebase.config";
import { useGetAllOrdersQuery } from "../../Redux/ordersApiSlice";
import PlainLoading from "../../components/LoadingScreen/Plain_Loading";
import { OrbitProgress } from "react-loading-indicators";

const Orders = () => {
  const id = auth.currentUser?.uid;
  const { data, isLoading } = useGetAllOrdersQuery(id);
  const orders = data?.data;
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <OrbitProgress color="#ffd700" size="large" text="" textColor="" />
      </div>
    );
  if (orders === undefined)
    return (
      <div className="min-h-screen flex justify-center items-center text-4xl">
        <h1>No Orders !</h1>
      </div>
    );
  return (
    <>
      <div className="h-[60px] sm:h-[67px]  w-full"></div>
      <div className="flex flex-col justify-start w-full min-h-screen p-8">
        <h1 className="text-2xl mb-8">orders</h1>
        {orders?.map((order, index) => (
          <div className="w-full" key={order._id}>
            <h1 className="bg-yellow-400 text-white p-2 w-6 h-6 m-1 rounded-full flex justify-center items-center">
              {index + 1}
            </h1>
            <article className="mb-4 rounded-2xl w-full flex gap-8 shadow p-2 flex-wrap">
              <h1>
                <span className="font-bold">created at: </span>
                {order.createdAt.slice(0, 10)}
              </h1>
              <div className="flex gap-4">
                <p className="font-bold">Address: </p>
                <div>
                  <p>
                    <span>city: </span>
                    <span className="text-gray-600">{order.address.city}</span>
                  </p>
                  <p>
                    <span>country: </span>
                    <span className="text-gray-600">
                      {order.address.country}
                    </span>
                  </p>
                  <p>
                    <span>state: </span>
                    <span className="text-gray-600">{order.address.state}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="font-bold">Books</div>
                <div>
                  {order.productIds.map((id) => (
                    <p key={id._id}>{id.title}</p>
                  ))}
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </>
  );
};

export default Orders;
