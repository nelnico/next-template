import { PersonSearchFormData } from "@/schemas/people/person-search-schema";
import { atom } from "jotai";

import { atomWithStorage } from "jotai/utils";

export const searchAtom = atomWithStorage<PersonSearchFormData>(
  "people-search",
  {
    query: "",
    genderId: "",
    countryIds: [],
  },
  undefined,
  { getOnInit: true }
);

export const appliedSearchAtom = atom((get) => get(searchAtom));

export const searchInProgressAtom = atom(false);
