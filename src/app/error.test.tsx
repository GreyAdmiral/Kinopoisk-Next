import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorPage from './error';

describe('Тесты ErrorBoundary', () => {
   test('Рендер', () => {
      const error = new Error('Lorem ipsum!');

      render(<ErrorPage error={error} />);

      expect(screen.getByText(/Lorem ipsum!/i)).toBeInTheDocument();
   });

   test('Обработка неизвестной ошибки', () => {
      render(<ErrorPage error={null} />);

      expect(screen.getByText(/Неизвестная ошибка!/i)).toBeInTheDocument();
   });
});
