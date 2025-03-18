import * as yup from "yup";
import { SEARCH } from "./fieldName";

export const schemaSearch = (language: string) =>
  yup
    .object()
    .shape({
      [SEARCH.SEARCH_QUERY]: yup
        .string()
        .required(
          language === "vi"
            ? "Vui lòng nhập từ khóa tìm kiếm"
            : "Please enter a search term"
        ),
    })
    .required();
