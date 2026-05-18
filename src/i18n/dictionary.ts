export type Locale = "ru" | "uk";

export type Dictionary = {
  topMenu: {
    activeSessions: string;
  };
  navigation: {
    logo: string;
    userFallback: string;
    orders: string;
    products: string;
    logout: string;
  };
  orders: {
    title: string;
    loading: string;
    loadingDetails: string;
    error: string;
  };
  products: {
    title: string;
    loading: string;
    loadingChart: string;
    error: string;
    empty: string;
    showChart: string;
    hideChart: string;
  };
  chart: {
    title: string;
    description: string;
    count: string;
  };
};

export const LOCALE_STORAGE_KEY = "appLocale";

export const localeLabels: Record<Locale, string> = {
  ru: "RU",
  uk: "UK",
};

export const localeIntlMap: Record<Locale, string> = {
  ru: "ru-RU",
  uk: "uk-UA",
};

export const dictionary: Record<Locale, Dictionary> = {
  ru: {
    topMenu: {
      activeSessions: "Активные сессии",
    },
    navigation: {
      logo: "Inventory",
      userFallback: "Пользователь",
      orders: "Приходы",
      products: "Продукты",
      logout: "Выйти",
    },
    orders: {
      title: "Приходы",
      loading: "Загрузка приходов...",
      loadingDetails: "Загрузка деталей прихода...",
      error: "Не удалось загрузить приходы.",
    },
    products: {
      title: "Продукты",
      loading: "Загрузка продуктов...",
      loadingChart: "Загрузка графика...",
      error: "Не удалось загрузить продукты.",
      empty: "Продукты не найдены.",
      showChart: "Показать график",
      hideChart: "Скрыть график",
    },
    chart: {
      title: "Статистика по типам продуктов",
      description: "Количество продуктов, сгруппированное по типу",
      count: "Количество",
    },
  },
  uk: {
    topMenu: {
      activeSessions: "Активні сесії",
    },
    navigation: {
      logo: "Inventory",
      userFallback: "Користувач",
      orders: "Приходи",
      products: "Продукти",
      logout: "Вийти",
    },
    orders: {
      title: "Приходи",
      loading: "Завантаження приходів...",
      loadingDetails: "Завантаження деталей приходу...",
      error: "Не вдалося завантажити приходи.",
    },
    products: {
      title: "Продукти",
      loading: "Завантаження продуктів...",
      loadingChart: "Завантаження графіка...",
      error: "Не вдалося завантажити продукти.",
      empty: "Продукти не знайдені.",
      showChart: "Показати графік",
      hideChart: "Сховати графік",
    },
    chart: {
      title: "Статистика за типами продуктів",
      description: "Кількість продуктів, згрупована за типом",
      count: "Кількість",
    },
  },
};
