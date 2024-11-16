import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import UndefinedPage from './not-found';

describe('Тесты страницы 404', () => {
   test('Рендер', () => {
      render(<UndefinedPage />);
      const page = screen.getByText(/Такой страницы нет!/i);

      expect(page).toBeInTheDocument();
      expect(page).toContainHTML('<span>Такой страницы нет!</span>');
   });
});
