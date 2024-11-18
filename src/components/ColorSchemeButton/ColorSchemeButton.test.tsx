import { beforeEach, describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { ColorSchemeButton } from './ColorSchemeButton';

describe('Тесты кнопки выбора темы', () => {
   beforeEach(() => {
      render(<ColorSchemeButton />);
   });

   test('Рендер', () => {
      const button = screen.getByRole('button');

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(/scheme_button/);
   });

   test('Тест нажатия', async () => {
      const button = screen.getByRole('button');

      await userEvent.click(button);
      expect(button).not.toHaveFocus();
   });
});
