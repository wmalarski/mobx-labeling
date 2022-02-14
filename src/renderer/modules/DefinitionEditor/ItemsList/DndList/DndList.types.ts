export type AuthorColors = {
  soft: string;
  hard: string;
};

export type Author = {
  id: string;
  name: string;
  avatarUrl: string;
  url: string;
  colors: AuthorColors;
};

export type Quote = {
  id: string;
  content: string;
  author: Author;
};

export type QuoteMap = {
  [key: string]: Quote[];
};
