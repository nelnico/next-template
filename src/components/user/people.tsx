"use client";
import { searchPeople } from "@/actions/person-actions";
import {
  appliedSearchAtom,
  searchInProgressAtom,
} from "@/atoms/user-search-atoms";
import { useAtom } from "jotai";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { PersonCard } from "./person-card";
import { Person } from "@prisma/client";

export const People = () => {
  const { ref, inView } = useInView();
  const [currentSearch] = useAtom(appliedSearchAtom);
  const [isSearching, setIsSearching] = useAtom(searchInProgressAtom);

  async function fetchPeople({ pageParam }: { pageParam: number }) {
    setIsSearching(true);
    try {
      const data = await searchPeople({
        pageParam: pageParam,
        size: 50,
        query: currentSearch.query ?? "",
        genderId: currentSearch.genderId
          ? Number(currentSearch.genderId)
          : undefined,
        countryIds: currentSearch.countryIds ?? [],
      });
      setIsSearching(false);
      return data;
    } catch (error) {
      setIsSearching(false);
      console.error("Error fetching people:", error);
      throw error;
    }
  }

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["people"],
    queryFn: fetchPeople,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParm) => {
      return lastPage?.length ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    refetch();
  }, [currentSearch, refetch]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, data?.pageParams]);

  if (status === "pending") {
    return <h1>Loading.....</h1>;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  const content = data?.pages?.map((people: Person[]) =>
    // `people.length / 2` is so we fetch the next page when you halfway through the current page
    // does this actually work?   TEST IT
    people?.map((person, index) => (
      <PersonCard
        key={person.id}
        person={person}
        className="border rounded-md cursor-pointer bg-yellow-50"
        innerRef={people.length / 2 === index - 1 ? ref : undefined}
      />
    ))
  );

  return (
    <div className="p-2 border bg-yellow-100">
      <div className="text-xl  mb-2">
        Client Component, listen to changes to search params and fetch data
      </div>

      <div className="grid grid-cols-1 gap-2">{content}</div>
      {isFetchingNextPage && (
        <div className="flex justify-center font-medium m-4 bg-background p-4 rounded-md">
          Loading more...
        </div>
      )}
      <div />
    </div>
  );
};
