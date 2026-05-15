"use client";

import type { Product } from "@/store/api/productsApi";
import { formatLongDate, formatShortDate } from "@/lib/formatDate";

import "./ProductCard.scss";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="product-card">
      <div className="product-card__status-wrap">
        <span
          className={`product-card__status ${
            product.isNew ? "product-card__status--new" : "product-card__status--used"
          }`}
        />
      </div>

      <div className="product-card__image">
        <span>🖥️</span>
      </div>

      <div className="product-card__main">
        <h2 className="product-card__title" title={product.title}>
          {product.title}
        </h2>
        <p className="product-card__serial">SN-{product.serialNumber}</p>
      </div>

      <div className="product-card__meta">
        <span className="product-card__type">{product.type}</span>
        <span className="product-card__specification" title={product.specification}>
          {product.specification}
        </span>
      </div>

      <div className="product-card__guarantee">
        <span>с {formatShortDate(product.guaranteeStart)}</span>
        <span>по {formatLongDate(product.guaranteeEnd)}</span>
      </div>

      <div className="product-card__prices">
        {product.prices.map((price) => (
          <span key={price.id}>
            {Number(price.value).toLocaleString("ru-RU")} {price.symbol}
          </span>
        ))}
      </div>

      <div className="product-card__order">
        <span title={product.order.title}>{product.order.title}</span>
      </div>
    </article>
  );
};
