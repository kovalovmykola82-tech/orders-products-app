"use client";

import type { Order } from "@/store/api/ordersApi";
import { formatDateTime } from "@/lib/formatDate";

import "./OrderDetails.scss";

type OrderDetailsProps = {
  order: Order;
  onClose: () => void;
};

export const OrderDetails = ({ order, onClose }: OrderDetailsProps) => {
  return (
    <aside className="order-details">
      <div className="order-details__header">
        <div>
          <h2 className="order-details__title" title={order.title}>
            {order.title}
          </h2>
          <p className="order-details__subtitle">
            {order.products.length} products · {formatDateTime(order.date)}
          </p>
        </div>

        <button className="order-details__close" type="button" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="order-details__products">
        {order.products.map((product) => (
          <div className="order-details__product" key={product.id}>
            <span
              className={`order-details__status ${
                product.isNew ? "order-details__status--new" : "order-details__status--used"
              }`}
            />

            <div className="order-details__product-main">
              <h3 className="order-details__product-title" title={product.title}>
                {product.title}
              </h3>
              <p className="order-details__product-meta">
                {product.type} · SN: {product.serialNumber}
              </p>
            </div>

            <div className="order-details__product-prices">
              {product.prices.map((price) => (
                <span key={price.id}>
                  {Number(price.value).toLocaleString("ru-RU")} {price.symbol}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
