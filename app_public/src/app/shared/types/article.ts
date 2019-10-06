export class Article {
  _id: string
  title: string
  name: string
  categories: string
  text: string
  tags: string
}

export class Category {
  _id: string
  name: string
  parent: string
  order: number
  children: Category[]
}

export class ArticleList {
  title: string;
  count: number;
  createdOn: string;
}