import { ProtectedRoute } from "@/components/auth/ProtectedRoute/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout/AppLayout";

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <h1>Приходы</h1>
      </AppLayout>
    </ProtectedRoute>
  );
}
