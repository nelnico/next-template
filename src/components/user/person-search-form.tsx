"use client";

import {
  PersonSearchFormData,
  personSearchSchema,
} from "@/schemas/people/person-search-schema";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { searchAtom, searchInProgressAtom } from "@/atoms/user-search-atoms";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  dbCountries,
  dbGenders,
  getDbItemsForSelectList,
  getValueById,
} from "@/lib/constants";

export const PeopleSearchForm = () => {
  const [searchParams, setSearchParams] = useAtom(searchAtom);
  const [isSearching, setIsSearching] = useAtom(searchInProgressAtom);

  const defaultValues: PersonSearchFormData = {
    // query: searchParams.query || "",
    // genderId: searchParams.genderId || undefined,
    // countryIds: [],
    query: "",
    genderId: undefined,
    countryIds: [],
  };

  const form = useForm<PersonSearchFormData>({
    resolver: zodResolver(personSearchSchema),
    defaultValues,
  });

  const formWatch = useWatch(form);

  useEffect(() => {
    const formData: PersonSearchFormData = form.getValues();
    setSearchParams(formData);
  }, [form, formWatch, setSearchParams]);

  return (
    <div className="p-2 border  ">
      <div className="text-xl  mb-2">
        Client Component, use react hook form and update search atom
      </div>
      <div>{JSON.stringify(form.getValues(), null, 2)}</div>
      <Form {...form}>
        <form className="flex flex-col gap-2 border mt-2">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search (by name or email)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Search..."
                    {...field}
                    className="bg-white"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genderId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={(value) => {
                    if (value) {
                      const gender = dbGenders.find(x => x.value === value) as SelectValue;
                      alert(JSON.stringify(gender));
                      field.onChange(gender);
                    }
                    
                  }}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <div>Select a gender</div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {getDbItemsForSelectList(dbGenders).map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value.toString()}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="countryIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Countries</FormLabel>
                <FormControl>
                  <MultiSelectFormField
                    options={dbCountriesOptions}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select options"
                    variant="inverted" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </form>
      </Form>

      {isSearching && <div className="text-red-500">Searching...</div>}
    </div>
  );
};
