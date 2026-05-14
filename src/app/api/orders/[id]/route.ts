import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const orderId = Number(id);

    if (Number.isNaN(orderId)) {
      return NextResponse.json({ message: "Invalid order id" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        products: {
          include: {
            prices: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ data: order });
  } catch (error) {
    console.error("Failed to fetch order:", error);

    return NextResponse.json(
      { message: "Failed to fetch order" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const orderId = Number(id);

    if (Number.isNaN(orderId)) {
      return NextResponse.json({ message: "Invalid order id" }, { status: 400 });
    }

    const existingOrder = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!existingOrder) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Failed to delete order:", error);

    return NextResponse.json(
      { message: "Failed to delete order" },
      { status: 500 },
    );
  }
}
