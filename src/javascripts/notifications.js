import { defaults, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaults.delay = 2000;
defaults.styling = 'brighttheme';

export default function notice(notice, response) {
  switch (notice) {
    case 'success':
      return success({
        title: 'Успех!',
        text: `По вашему запросу было найдено: ${response.length} результатов`,
      });
    case 'info':
      return info({
        title: 'Упс...',
        text: 'Вы ничего не ввели.',
      });
    case 'no result':
      return info({
        title: 'Упс...',
        text: 'Нет ни одного результата по вашему запросу.',
      });
    case 'error':
      return error({
        title: 'Ошибка 404',
        text: 'Что-то пошло не так!',
      });
  }
}
