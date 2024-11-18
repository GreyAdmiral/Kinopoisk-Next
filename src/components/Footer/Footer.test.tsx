import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Тесты подвала', () => {
   test('Рендер', () => {
      render(<Footer />);
      const footer = screen.getByText(/RSScool/i);

      expect(footer).toBeInTheDocument();
      expect(footer).toHaveAttribute('href', 'https://rs.school/');
      expect(footer).toHaveAttribute('title', 'Открыть сайт школы');
   });
});
