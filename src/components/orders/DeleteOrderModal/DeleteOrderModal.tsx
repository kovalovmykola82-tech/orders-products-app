"use client";

import type { Order } from "@/store/api/ordersApi";

import "./DeleteOrderModal.scss";

type DeleteOrderModalProps = {
  order: Order | null;
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const DeleteOrderModal = ({
  order,
  isLoading,
  onClose,
  onConfirm,
}: DeleteOrderModalProps) => {
  if (!order) {
    return null;
  }

  return (
    <div className="delete-order-modal" role="dialog" aria-modal="true">
      <div className="delete-order-modal__backdrop" onClick={onClose} />

      <div className="delete-order-modal__content">
        <div className="delete-order-modal__body">
          <h2 className="delete-order-modal__title">Удалить приход?</h2>

          <p className="delete-order-modal__text">
            Вы действительно хотите удалить приход:
          </p>

          <p className="delete-order-modal__order-title" title={order.title}>
            {order.title}
          </p>

          <p className="delete-order-modal__hint">
            Вместе с приходом будут удалены связанные продукты и цены.
          </p>
        </div>

        <div className="delete-order-modal__footer">
          <button
            className="delete-order-modal__cancel"
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            Отмена
          </button>

          <button
            className="delete-order-modal__confirm"
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Удаление..." : "Удалить"}
          </button>
        </div>
      </div>
    </div>
  );
};
