export enum ActionTypes {
  UPDATE_ARTICLE = '[Update Article] Update Article',
  UPDATE_ARTICLE_SUCCESS = '[Update Article] Update Article Success',
  UPDATE_ARTICLE_FAILURE = '[Update Article] Update Article Failure',

  GET_ARTICLE = '[Get Article] Get Article',
  GET_ARTICLE_SUCCESS = '[Get Article] Get Article Success',
  GET_ARTICLE_FAILURE = '[Get Article] Get Article Failure',
}
// всі екшени глобальні, і якщо ми викликаємо get article і не важливо на якій сорінці,
// то він буде викликаний для всього додатку і в усіх редьюсерах
// ми будемо міняти стан нашої сторінки, навіть якщо ми на сторінці читання (не редагування)
