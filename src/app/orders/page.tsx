"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout/AppLayout";
import { OrderCard } from "@/components/orders/OrderCard/OrderCard";
import {
  Order,
  useDeleteOrderMutation,
  useGetOrdersQuery,
} from "@/store/api/ordersApi";

const OrderDetails = dynamic(
  () =>
    import("@/components/orders/OrderDetails/OrderDetails").then(
      (module) => module.OrderDetails,
    ),
  {
    loading: () => <p className="orders-page__state">Загрузка деталей прихода...</p>,
    ssr: false,
  },
);

const DeleteOrderModal = dynamic(
  () =>
    import("@/components/orders/DeleteOrderModal/DeleteOrderModal").then(
      (module) => module.DeleteOrderModal,
    ),
  {
    loading: () => null,
    ssr: false,
  },
);

export default function OrdersPage() {
  const { data: orders = [], isLoading, isError } = useGetOrdersQuery();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  const handleConfirmDelete = async () => {
    if (!orderToDelete) {
      return;
    }

    try {
      await deleteOrder(orderToDelete.id).unwrap();

      if (selectedOrder?.id === orderToDelete.id) {
        setSelectedOrder(null);
      }

      setOrderToDelete(null);
    } catch (error) {
      console.error("Failed to delete order:", error);
    }
  };

  return (
    <ProtectedRoute>
      <AppLayout>
        <section className="orders-page">
          <div className="orders-page__header">
            <h1 className="orders-page__title">Приходы</h1>
            <span className="orders-page__count">{orders.length}</span>
          </div>

          {isLoading && <p className="orders-page__state">Загрузка приходов...</p>}

          {isError && (
            <p className="orders-page__state orders-page__state--error">
              Не удалось загрузить приходы.
            </p>
          )}

          {!isLoading && !isError && (
            <div
              className={`orders-page__workspace ${
                selectedOrder ? "orders-page__workspace--with-details" : ""
              }`}
            >
              <div className="orders-page__list">
                {orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    isActive={selectedOrder?.id === order.id}
                    isCompact={Boolean(selectedOrder)}
                    onSelect={setSelectedOrder}
                    onDeleteClick={setOrderToDelete}
                  />
                ))}
              </div>

              {selectedOrder && (
                <OrderDetails order={selectedOrder} onClose={handleCloseDetails} />
              )}
            </div>
          )}
        </section>

        {orderToDelete && (
          <DeleteOrderModal
            order={orderToDelete}
            isLoading={isDeleting}
            onClose={() => setOrderToDelete(null)}
            onConfirm={handleConfirmDelete}
          />
        )}
      </AppLayout>
    </ProtectedRoute>
  );
}
