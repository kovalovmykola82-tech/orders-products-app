"use client";

import { useMemo, useState } from "react";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout/AppLayout";
import { ProductCard } from "@/components/products/ProductCard/ProductCard";
import { ProductFilter } from "@/components/products/ProductFilter/ProductFilter";
import { useGetProductsQuery } from "@/store/api/productsApi";

export default function ProductsPage() {
  const [selectedType, setSelectedType] = useState("");

  const { data: products = [], isLoading, isError } = useGetProductsQuery(
    selectedType || undefined,
  );

  const { data: allProducts = [] } = useGetProductsQuery(undefined);

  const productTypes = useMemo(() => {
    return Array.from(new Set(allProducts.map((product) => product.type))).sort();
  }, [allProducts]);

  return (
    <ProtectedRoute>
      <AppLayout>
        <section className="products-page">
          <div className="products-page__header">
            <div className="products-page__title-wrap">
              <h1 className="products-page__title">Продукты</h1>
              <span className="products-page__count">{products.length}</span>
            </div>

            <ProductFilter
              types={productTypes}
              selectedType={selectedType}
              onChange={setSelectedType}
            />
          </div>

          {isLoading && <p className="products-page__state">Загрузка продуктов...</p>}

          {isError && (
            <p className="products-page__state products-page__state--error">
              Не удалось загрузить продукты.
            </p>
          )}

          {!isLoading && !isError && products.length === 0 && (
            <p className="products-page__state">Продукты не найдены.</p>
          )}

          {!isLoading && !isError && products.length > 0 && (
            <div className="products-page__list">
              {products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          )}
        </section>
      </AppLayout>
    </ProtectedRoute>
  );
}
