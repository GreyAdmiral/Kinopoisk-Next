import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import LoadingMovies from './loading';

describe('Тесты контейнера главного спинера', () => {
   test('Рендер', () => {
      const { container } = render(<LoadingMovies />);
      const loadingElement = container.querySelector('div');

      expect(loadingElement).toHaveClass(/loader_container/i);
   });
});
