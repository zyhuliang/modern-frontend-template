export interface PostFrontMatter {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  category?: string;
  cover?: string;
  author?: string;
}

export interface Post {
  slug: string;
  frontMatter: PostFrontMatter;
  content: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
  category?: string;
  cover?: string;
}
