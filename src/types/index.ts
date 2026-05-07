export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Author = {
  id: string;
  name: string;
  profile: string;
  avatar: {
    url: string;
    width: number;
    height: number;
  };
};

export type Article = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  eyecatch: {
    url: string;
    width: number;
    height: number;
  };
  category: Category;
  author?: Author;
  tags?: string[];
};

export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
