"use client";

import type { Order } from "@/store/api/ordersApi";
import { calculateTotalsByCurrency, formatCurrencyTotal } from "@/lib/calculateTotals";
import { formatLongDate, formatShortDate } from "@/lib/formatDate";

import "./OrderCard.scss";

type OrderCardProps = {
  order: Order;
  isActive: boolean;
  isCompact: boolean;
  onSelect: (order: Order) => void;
  onDeleteClick: (order: Order) => void;
};

export const OrderCard = ({
  order,
  isActive,
  isCompact,
  onSelect,
  onDeleteClick,
}: OrderCardProps) => {
  const totals = calculateTotalsByCurrency(order.products);

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDeleteClick(order);
  };

  return (
    <article
      className={`order-card ${isActive ? "order-card--active" : ""} ${
        isCompact ? "order-card--compact" : ""
      }`}
      onClick={() => onSelect(order)}
    >
      <div className="order-card__main">
        <h2 className="order-card__title" title={order.title}>
          {order.title}
        </h2>

        <div className="order-card__products-count">
          <span className="order-card__count-value">{order.products.length}</span>
          <span className="order-card__count-label">продукта</span>
        </div>
      </div>

      {!isCompact && (
        <>
          <div className="order-card__date">
            <span>{formatShortDate(order.date)}</span>
            <span>{formatLongDate(order.date)}</span>
          </div>

          <div className="order-card__totals">
            <span>{formatCurrencyTotal(totals.USD ?? 0, "USD")}</span>
            <span>{formatCurrencyTotal(totals.UAH ?? 0, "UAH")}</span>
          </div>

          <button className="order-card__delete" type="button" onClick={handleDeleteClick}>
            ✕
          </button>
        </>
      )}
    </article>
  );
};
