export interface Book {
  _id: string;
  title: string;
  author: author;
  description: string;
  genre: string;
  file: string;
  coverImage: string;
  createdAt: string;
}

export interface author {
  _id: string;
  name: string;
}
