import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Header } from './Header';

describe('Тесты шапки', () => {
   beforeEach(() => {
      render(<Header />);
   });

   test('Рендер заголовка', () => {
      const linkElement = screen.getByText(/Неофициальный кинопоиск/i);

      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveClass(/header/i);
   });

   test('Рендер кнопки смены темы', () => {
      const buttonElement = screen.getByRole('button');

      expect(buttonElement).toBeInTheDocument();
   });

   test('Клик по ссылке', async () => {
      const linkElement = screen.getByText(/Неофициальный кинопоиск/i);

      await userEvent.click(linkElement);
      expect(window.location.pathname).toBe('/');
   });
});
