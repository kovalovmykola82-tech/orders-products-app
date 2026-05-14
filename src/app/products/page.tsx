import { ProtectedRoute } from "@/components/auth/ProtectedRoute/ProtectedRoute";

export default function ProductsPage() {
  return (
    <ProtectedRoute>
      <main>Products page</main>
    </ProtectedRoute>
  );
}
