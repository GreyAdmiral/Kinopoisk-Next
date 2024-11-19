import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomCheckBox } from './CustomCheckBox';

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

describe('Тесты кнопки выбора темы', () => {
   beforeEach(() => {
      render(<CustomCheckBox movie={movie} />);
   });

   test('Рендер', () => {
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('name', movie.kinopoiskId);
   });

   test('Тест нажатия', async () => {
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).not.toBeChecked();
      await userEvent.click(checkbox);
      expect(checkbox).toBeChecked();
   });
});
