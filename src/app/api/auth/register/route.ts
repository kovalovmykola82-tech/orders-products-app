import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { signAuthToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters long" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name: typeof name === "string" ? name : null,
        passwordHash,
      },
    });

    const token = signAuthToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    return NextResponse.json(
      {
        data: {
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to register:", error);

    return NextResponse.json(
      { message: "Failed to register" },
      { status: 500 },
    );
  }
}
