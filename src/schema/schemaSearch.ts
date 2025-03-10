import * as yup from "yup";

import { SEARCH } from "./fieldName";

export const schemaSearch = yup
  .object()
  .shape({
    [SEARCH.SEARCH_QUERY]: yup.string().required("Please enter a search term"),
  })
  .required();
