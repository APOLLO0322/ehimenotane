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
  categories?: Category;
  areas?: Area;
  address?: string;
  googleMapUrl?: string;
  operatingDays?: string;
  websiteUrl?: string;
  instagramUrl?: string;
};

export type ArticleSection = {
  fieldId?: string;
  templateType?: string;
  heading1?: string;
  text1?: string;
  image1?: MicroCMSImage;
  heading2?: string;
  text2?: string;
  image2?: MicroCMSImage[];
  heading3?: string;
  text3?: string;
  image3?: MicroCMSImage[];
  videoURL?: string;
};

export type Article = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  revisedAt?: string;
  title: string;
  slug: string;
  eyecatch?: MicroCMSImage;
  articleSections?: ArticleSection[];
  tags?: Tag[];
  client?: Client;
  hero?: boolean;
  firstArticle?: boolean;
  feature?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
