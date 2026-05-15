type Price = {
  value: string;
  symbol: string;
};

type ProductWithPrices = {
  prices: Price[];
};

export const calculateTotalsByCurrency = (products: ProductWithPrices[]) => {
  return products.reduce<Record<string, number>>((acc, product) => {
    product.prices.forEach((price) => {
      const currentValue = acc[price.symbol] ?? 0;
      acc[price.symbol] = currentValue + Number(price.value);
    });

    return acc;
  }, {});
};

export const formatCurrencyTotal = (value: number, symbol: string) => {
  return `${value.toLocaleString("ru-RU")} ${symbol}`;
};
