// input у назві, бо ми передаємо дані бекенду
export interface ArticleInputInterface {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
