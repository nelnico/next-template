import { PeopleSearchForm } from "@/components/user/person-search-form";
import { People } from "@/components/user/people";

const PeoplePage = () => {
  return (
    <div className="bg-slate-100 p-2">
      <div className="text-xl  mb-2  ">
        Page (server) does nothing but render two components
      </div>
      <div className="flex">
        <div className="w-1/2  border p-4">
          <PeopleSearchForm />
        </div>
        <div className="w-1/2  border p-4">
          <People />
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
