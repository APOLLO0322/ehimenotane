export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

export type MicroCMSBase = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
};

export type Category = MicroCMSBase & {
  name: string;
  slug: string;
  description?: string;
  order?: number;
  showOnTop?: boolean;
};

export type Tag = MicroCMSBase & {
  name: string;
  slug: string;
  type?: string;
  description?: string;
};

export type Area = MicroCMSBase & {
  name: string;
  slug: string;
  parentArea?: Area;
  description?: string;
  order?: number;
};

export type Client = MicroCMSBase & {
  name: string;
  slug: string;
  category?: Category;
  area?: Area;
  address?: string;
  googleMapUrl?: string;
  operatingDays?: string;
  logo?: MicroCMSImage;
  mainImage?: MicroCMSImage;
  industry?: string;
  websiteUrl?: string;
  instagramUrl?: string;
};

export type ArticleBlock = {
  fieldId: string;
  blockType?: string[];
  heading?: string;
  body?: string;
  image?: MicroCMSImage;
  imageCaption?: string;
  videoURL?: string;
};

export type Article = MicroCMSBase & {
  title: string;
  slug: string;
  eyecatch?: MicroCMSImage;
  contentBlocks?: ArticleBlock[];
  client?: Client;
  category?: Category;
  area?: Area;
  tags?: Tag[];
  hero?: boolean;
  seoTitle?: string;
  seoDescliotion?: string;
};

export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
