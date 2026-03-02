import { api } from "@/lib/api";
import {
  GetAllLibraryArticlesResponse,
  LibraryQueryParams,
} from "../type/library";

export async function getAllLibraryArticles(
  params?: LibraryQueryParams,
): Promise<GetAllLibraryArticlesResponse> {
  const response = await api.get<GetAllLibraryArticlesResponse>(
    "/article/get-all",
    {
      params,
    },
  );

  return response.data;
}
