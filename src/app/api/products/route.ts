import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    const products = await prisma.product.findMany({
      where: type
        ? {
            type,
          }
        : undefined,
      orderBy: {
        date: "desc",
      },
      include: {
        prices: true,
        order: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return NextResponse.json({ data: products });
  } catch (error) {
    console.error("Failed to fetch products:", error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
