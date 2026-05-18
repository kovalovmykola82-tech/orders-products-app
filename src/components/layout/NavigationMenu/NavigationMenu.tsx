"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useTranslation } from "@/i18n/I18nProvider";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

import "./NavigationMenu.scss";

export const NavigationMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { t } = useTranslation();

  const navItems = [
    {
      label: t.navigation.orders,
      href: "/orders",
    },
    {
      label: t.navigation.products,
      href: "/products",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    dispatch(logout());
    router.replace("/login");
  };

  return (
    <aside className="navigation-menu">
      <div className="navigation-menu__logo">{t.navigation.logo}</div>

      <div className="navigation-menu__user">
        <div className="navigation-menu__avatar">
          {user?.name?.[0] ?? user?.email?.[0] ?? "U"}
        </div>
        <div className="navigation-menu__user-info">
          <span className="navigation-menu__user-name">
            {user?.name ?? t.navigation.userFallback}
          </span>
          <span className="navigation-menu__user-email">{user?.email}</span>
        </div>
      </div>

      <nav className="navigation-menu__nav">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              className={`navigation-menu__link ${
                isActive ? "navigation-menu__link--active" : ""
              }`}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button className="navigation-menu__logout" type="button" onClick={handleLogout}>
        {t.navigation.logout}
      </button>
    </aside>
  );
};
