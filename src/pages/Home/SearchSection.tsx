import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaSearch } from "react-icons/fa";
import { schemaSearch } from "@schema/schemaSearch";
import { SEARCH } from "@schema/fieldName";
import FormInput from "@components/form-input/FormInput";

interface SearchFormDataSchema {
  searchQuery: string;
}

interface SearchSectionProps {
  onSearch: (searchQuery: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const methods = useForm<SearchFormDataSchema>({
    resolver: yupResolver(schemaSearch),
    defaultValues: {
      searchQuery: "",
    },
  });
  const onSubmit = (data: SearchFormDataSchema) => {
    onSearch(data?.searchQuery);
  };

  return (
    <div className="bg-white py-8 shadow-md relative -mt-6 mx-4 rounded-lg z-20">
      <div className="max-w-4xl mx-auto px-4">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row items-center gap-4"
          >
            <div className="flex-1 w-full">
              <FormInput
                name={SEARCH.SEARCH_QUERY}
                placeholder="Search for stations or points of interest"
                icon={<FaSearch />}
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md w-full md:w-auto transition-colors duration-300 flex justify-center items-center"
            >
              Search
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SearchSection;
