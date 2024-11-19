import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Movie } from './Movie';

const movie = {
   kinopoiskId: '5260016',
   imdbId: null,
   nameRu: 'Test Movie',
   nameEn: '',
   nameOriginal: '',
   countries: [
      {
         country: '',
      },
   ],
   genres: [
      {
         genre: '',
      },
   ],
   ratingKinopoisk: 1.2,
   ratingImdb: null,
   year: 1234,
   type: '',
   posterUrl: '',
   posterUrlPreview: '',
};

describe('Тесты компонента с фильмом', () => {
   beforeEach(() => {
      render(<Movie movie={movie} />);
   });

   test('Рендер', async () => {
      expect(screen.getByTitle('Посмотреть подробности')).toBeInTheDocument();
   });
});
