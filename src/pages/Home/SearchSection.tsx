import FormInput from "@components/form-input/FormInput";
import type { MetroStation } from "@data/metroLines";
import { metroStations } from "@data/metroLines";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDebounce } from "@hooks/useDebounce";
import { useTranslation } from "@hooks/useTranslation";
import { SEARCH } from "@schema/fieldName";
import { schemaSearch } from "@schema/schemaSearch";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

interface SearchFormDataSchema {
  searchQuery: string;
}

interface SearchSectionProps {
  onStationSelect?: (station: MetroStation) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onStationSelect }) => {
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<MetroStation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { t, language } = useTranslation();
  const methods = useForm<SearchFormDataSchema>({
    resolver: yupResolver(schemaSearch(language)),
    defaultValues: {
      searchQuery: "",
    },
  });

  // Effect to handle debounced search
  useEffect(() => {
    if (debouncedSearchTerm.trim().length > 0) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      const filteredStations = Object.values(metroStations).filter(
        (station) =>
          station?.name?.en?.toLowerCase().includes(searchLower) ||
          station?.name?.vi?.toLowerCase().includes(searchLower)
      );

      setSearchResults(filteredStations);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [debouncedSearchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = (data: SearchFormDataSchema) => {
    const searchTerm = data?.searchQuery;
    if (searchTerm.length > 0) {
      const searchLower = searchTerm.toLowerCase();
      const filteredStations = Object.values(metroStations).filter(
        (station) =>
          station.name.en.toLowerCase().includes(searchLower) ||
          station.name.vi.toLowerCase().includes(searchLower)
      );

      setSearchResults(filteredStations);

      if (filteredStations.length === 1 && onStationSelect) {
        onStationSelect(filteredStations[0]);
      }
    }

    setShowResults(false);
  };

  const handleStationClick = (station: MetroStation) => {
    if (onStationSelect) {
      onStationSelect(station);
      setShowResults(false);
    }
  };

  const handleClickOutside = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  return (
    <div className="bg-white py-8 shadow-md relative -mt-6 mx-4 rounded-lg z-20">
      <div className="max-w-4xl mx-auto px-4">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row items-center gap-4"
          >
            <div className="flex-1 w-full relative">
              <FormInput
                name={SEARCH.SEARCH_QUERY}
                placeholder={t("searchPlaceholder")}
                icon={<FaSearch />}
                onChange={handleSearchChange}
                onBlur={handleClickOutside}
              />

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-2 border-b border-gray-100">
                    <h3 className="text-sm font-medium text-gray-500">
                      {t("stations")}
                    </h3>
                  </div>
                  {searchResults.map((station) => (
                    <div
                      key={station.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => handleStationClick(station)}
                    >
                      <FaMapMarkerAlt className="text-purple-600 mr-2" />
                      <span>{station.name[language]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-md w-full md:w-auto transition-colors duration-300 flex justify-center items-center"
            >
              {t("search")}
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SearchSection;
