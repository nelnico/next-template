"use server";
import db from "@/lib/db";
import { UserSearchParams as PersonSearchParams } from "@/types/user";
import { Person } from "@prisma/client";

export async function searchPeople(
  searchParams: PersonSearchParams
): Promise<Person[]> {
  try {
    let whereCondition = {};

    if (searchParams.query) {
      whereCondition = {
        OR: [
          { name: { contains: searchParams.query, mode: "insensitive" } },
          { email: { contains: searchParams.query, mode: "insensitive" } },
        ],
      };
    }

    if (searchParams.genderId) {
      whereCondition = { ...whereCondition, genderId: searchParams.genderId };
    }

    if (searchParams.countryIds && searchParams.countryIds.length > 0) {
      whereCondition = {
        ...whereCondition,
        countryId: { in: searchParams.countryIds.map(Number) },
      };
    }

    const skip = (searchParams.pageParam - 1) * searchParams.size;

    return db.person.findMany({
      skip: skip,
      take: searchParams.size,
      where: whereCondition,
    });
  } catch (error) {
    console.error("Error fetching people:", error);
    return [];
  }
}
