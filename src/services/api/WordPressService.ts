/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface WPPage {
  _embedded: any;
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  modified: string;
  featured_media: number;

  jetpack_featured_media_url: string;
  acf?: any; // Nếu trang web sử dụng Advanced Custom Fields
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      [key: string]: {
        source_url: string;
      };
    };
  };
}

// Base URL của WordPress API
const API_BASE_URL = "/wp-api"; // Sử dụng proxy đã cấu hình trong Vite

const wpApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để xử lý lỗi chung
wpApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.request);
    } else {
      console.error("Request Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Service để gọi API
const WordPressService = {
  // Lấy thông tin về tuyến metro từ trang
  getMetroLine: async (slug: string): Promise<WPPage | null> => {
    try {
      const response = await wpApi.get("/pages", {
        params: {
          slug,
          _embed: "true", // Lấy cả hình ảnh đại diện
        },
      });

      if (response.data && response.data.length > 0) {
        return response.data[0];
      }
      return null;
    } catch (error) {
      console.error(`Error fetching metro line ${slug}:`, error);
      return null;
    }
  },

  // Lấy thông tin về một trang cụ thể
  getPage: async (slug: string): Promise<WPPage | null> => {
    try {
      const response = await wpApi.get("/pages", {
        params: {
          slug,
          _embed: "true",
        },
      });

      if (response.data && response.data.length > 0) {
        return response.data[0];
      }
      return null;
    } catch (error) {
      console.error(`Error fetching page ${slug}:`, error);
      return null;
    }
  },
  getAllPages: async (perPage = 100): Promise<WPPage[]> => {
    try {
      const response = await wpApi.get("/pages", {
        params: {
          per_page: perPage,
          _embed: true, // Sử dụng _embed: true thay vì chỉ định rõ
        },
      });

      return response.data || [];
    } catch (error) {
      console.error("Error fetching all pages:", error);
      return [];
    }
  },

  // Lấy danh sách bài viết tin tức/cập nhật mới nhất với hình ảnh
  getLatestUpdates: async (perPage = 3): Promise<WPPage[]> => {
    try {
      const response = await wpApi.get("/posts", {
        params: {
          per_page: perPage,
          _embed: "true",
        },
      });

      return response.data || [];
    } catch (error) {
      console.error("Error fetching latest updates:", error);
      return [];
    }
  },

  // Lấy thông tin chi tiết các bài viết
  getPosts: async (): Promise<WPPage[] | null> => {
    try {
      const response = await wpApi.get("/posts", {
        params: {
          per_page: 100,
          _embed: "true",
        },
      });

      if (response.data && response.data.length > 0) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching posts`, error);
      return null;
    }
  },

  // Lấy bài viết theo slug
  getPostBySlug: async (slug: string): Promise<WPPage> => {
    try {
      const response = await wpApi.get("/posts", {
        params: {
          slug,
          _embed: "true",
        },
      });
      if (response?.data && response?.data?.length > 0) {
        return response?.data[0];
      }
      throw new Error("Post not found");
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      throw error;
    }
  },
  // Lấy hình ảnh
  getMedia: async (mediaId: number): Promise<WPMedia | null> => {
    try {
      const response = await wpApi.get(`/media/${mediaId}`);
      return response.data || null;
    } catch (error) {
      console.error(`Error fetching media ${mediaId}:`, error);
      return null;
    }
  },

  // Tìm kiếm bài viết
  searchContent: async (searchTerm: string): Promise<WPPage[]> => {
    try {
      const response = await wpApi.get("/search", {
        params: {
          search: searchTerm,
          type: "post,page",
          per_page: 10,
        },
      });

      return response?.data || [];
    } catch (error) {
      console.error(`Error searching for ${searchTerm}:`, error);
      return [];
    }
  },
};

export default WordPressService;
