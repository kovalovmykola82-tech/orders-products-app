"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useTranslation } from "@/i18n/I18nProvider";
import type { Product } from "@/store/api/productsApi";

import "./ProductsTypeChart.scss";

type ProductsTypeChartProps = {
  products: Product[];
};

export const ProductsTypeChart = ({ products }: ProductsTypeChartProps) => {
  const { t } = useTranslation();

  const data = Object.values(
    products.reduce<Record<string, { type: string; count: number }>>((acc, product) => {
      if (!acc[product.type]) {
        acc[product.type] = {
          type: product.type,
          count: 0,
        };
      }

      acc[product.type].count += 1;

      return acc;
    }, {}),
  );

  if (data.length === 0) {
    return null;
  }

  return (
    <section className="products-type-chart">
      <div className="products-type-chart__header">
        <h2 className="products-type-chart__title">{t.chart.title}</h2>
        <p className="products-type-chart__description">{t.chart.description}</p>
      </div>

      <div className="products-type-chart__body">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="type" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" name={t.chart.count} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
