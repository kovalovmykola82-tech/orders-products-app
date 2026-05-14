import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        date: "desc",
      },
      include: {
        products: {
          include: {
            prices: true,
          },
        },
      },
    });

    return NextResponse.json({ data: orders });
  } catch (error) {
    console.error("Failed to fetch orders:", error);

    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
