import { ProtectedRoute } from "@/components/auth/ProtectedRoute/ProtectedRoute";

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <main>Orders page</main>
    </ProtectedRoute>
  );
}
