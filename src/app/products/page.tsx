import { ProtectedRoute } from "@/components/auth/ProtectedRoute/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout/AppLayout";

export default function ProductsPage() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <h1>Продукты</h1>
      </AppLayout>
    </ProtectedRoute>
  );
}
