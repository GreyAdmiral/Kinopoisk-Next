import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DialogNotification } from './DialogNotification';

describe('Тесты уведомления', () => {
   test('Рендер показа уведомления', () => {
      render(<DialogNotification isOpenNotification={true}>Lorem ipsum</DialogNotification>);
      const notification = screen.getByText(/Lorem ipsum/i);

      expect(notification).toBeInTheDocument();
      expect(notification).toHaveClass(/notification/);
   });

   test('Отсутствие уведомления', () => {
      render(<DialogNotification isOpenNotification={false}>Lorem ipsum</DialogNotification>);
      const notification = screen.queryByText(/Lorem ipsum/i);

      expect(notification).toBeNull();
   });
});
