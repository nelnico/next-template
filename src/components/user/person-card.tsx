import { dbCountries, dbGenders, getValueById } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Person } from "@prisma/client";

interface PersonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  person: Person;
  innerRef?: React.Ref<HTMLDivElement>;
}

export const PersonCard = ({
  person,
  innerRef,
  className,
  ...props
}: PersonCardProps) => {
  return (
    <div ref={innerRef} className={cn("space-y-1 p-6", className)} {...props}>
      <div className="flex justify-between items-center">
        <div className="text-lg font-bold">{person.name}</div>
        <div>{getValueById(dbGenders, person.genderId)?.name}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-md font-semibold">{person.email}</div>
        <div>{getValueById(dbCountries, person.countryId)?.name}</div>
      </div>
    </div>
  );
};
