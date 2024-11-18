import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeaderLink } from './HeaderLink';
import { AppRoutes } from '@tools/costants';

describe('Тесты ссылки в шапке', () => {
   test('Рендер', () => {
      render(<HeaderLink />);
      const headerLink = screen.getByText(/Неофициальный кинопоиск/i);

      expect(headerLink).toBeInTheDocument();
      expect(headerLink).toHaveAttribute('href', AppRoutes.HOME_ROUTE);
      expect(headerLink).toHaveAttribute('title', 'Перейти на главную страницу');
   });
});
