import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const parseDate = (value: string) => new Date(value.replace(" ", "T"));

async function main() {
  console.log("Seeding database...");

  await prisma.price.deleteMany();
  await prisma.product.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("password123", 10);

  await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin",
      passwordHash,
    },
  });

  const order1 = await prisma.order.create({
    data: {
      title: "Длинное предлинное название прихода, которое должно обрезаться в интерфейсе",
      date: parseDate("2017-06-29 12:09:33"),
      description: "desc",
    },
  });

  const order2 = await prisma.order.create({
    data: {
      title: "Order 2",
      date: parseDate("2017-06-29 12:09:33"),
      description: "desc",
    },
  });

  const order3 = await prisma.order.create({
    data: {
      title: "Order 3",
      date: parseDate("2017-06-29 12:09:33"),
      description: "desc",
    },
  });

  await prisma.product.create({
    data: {
      serialNumber: "1234",
      isNew: true,
      photo: "pathToFile.jpg",
      title: "Product 1",
      type: "Monitors",
      specification: "Specification 1",
      guaranteeStart: parseDate("2017-06-29 12:09:33"),
      guaranteeEnd: parseDate("2018-06-29 12:09:33"),
      orderId: order1.id,
      date: parseDate("2017-06-29 12:09:33"),
      prices: {
        create: [
          { value: 100, symbol: "USD", isDefault: false },
          { value: 2600, symbol: "UAH", isDefault: true },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      serialNumber: "1234",
      isNew: true,
      photo: "pathToFile.jpg",
      title: "Product 2",
      type: "Monitors",
      specification: "Specification 2",
      guaranteeStart: parseDate("2017-06-29 12:09:33"),
      guaranteeEnd: parseDate("2018-06-29 12:09:33"),
      orderId: order2.id,
      date: parseDate("2017-06-29 12:09:33"),
      prices: {
        create: [
          { value: 120, symbol: "USD", isDefault: false },
          { value: 3120, symbol: "UAH", isDefault: true },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      serialNumber: "5678",
      isNew: false,
      photo: "pathToFile.jpg",
      title: "Product 3",
      type: "Laptops",
      specification: "Specification 3",
      guaranteeStart: parseDate("2017-06-29 12:09:33"),
      guaranteeEnd: parseDate("2019-06-29 12:09:33"),
      orderId: order3.id,
      date: parseDate("2017-06-29 12:09:33"),
      prices: {
        create: [
          { value: 900, symbol: "USD", isDefault: false },
          { value: 23400, symbol: "UAH", isDefault: true },
        ],
      },
    },
  });

  console.log("Database has been seeded successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
