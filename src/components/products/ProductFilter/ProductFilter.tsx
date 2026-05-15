"use client";

import "./ProductFilter.scss";

type ProductFilterProps = {
  types: string[];
  selectedType: string;
  onChange: (type: string) => void;
};

export const ProductFilter = ({ types, selectedType, onChange }: ProductFilterProps) => {
  return (
    <div className="product-filter">
      <label className="product-filter__label" htmlFor="product-type">
        Тип:
      </label>

      <select
        className="product-filter__select"
        id="product-type"
        value={selectedType}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Все типы</option>

        {types.map((type) => (
          <option value={type} key={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};
