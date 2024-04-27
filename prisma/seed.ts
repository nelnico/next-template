import { faker, fakerAR } from "@faker-js/faker";

import { PrismaClient } from "@prisma/client";

const countries = [
  "United States",
  "South Africa",
  "France",
  "Germany",
  "Kenya",
];

const prisma = new PrismaClient();
async function main() {
  const startDate = new Date("1940-01-01");
  const endDate = new Date("2005-12-31");

  for (let i = 0; i < 100000; i++) {
    const name = faker.person.fullName();
    const email = faker.internet.email();
    const yearOfBirth = faker.date.between(startDate, endDate).getFullYear();
    let gender = faker.person.sex().toLowerCase();
    const country = faker.helpers.arrayElement(countries);

    let genderId = 1;

    if (gender === "male") genderId = 2;

    let countryId = 1;
    if (country === "South Africa") countryId = 2;
    if (country === "France") countryId = 3;
    if (country === "Germany") countryId = 4;
    if (country === "Kenya") countryId = 5;

    await prisma.person.upsert({
      where: { email: email },
      update: {},
      create: {
        name: name,
        email: email,
        yearOfBirth: yearOfBirth,
        genderId: genderId,
        countryId: countryId,
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
