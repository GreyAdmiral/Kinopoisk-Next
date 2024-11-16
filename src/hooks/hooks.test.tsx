import { describe, expect, Mock, test, vi } from 'vitest';
import { act, render, renderHook, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useQueryParams } from './useQueryParams';
import { useMediaQuery } from './useMediaQuery';
import { useLocalStorage } from './useLocalStorage';
import { useLocalStorageSync } from './useLocalStorageSync';
import { useLockScroll } from './useLockScroll';
import { useClickOutside } from './useClickOutside';
import { usePlaceholder } from './usePlaceholder';
import { useFetch } from './useFetch';
import { usePageBottom } from './usePageBottom';
import { useDeviceDetect } from './useDeviceDetect';
import { useCopyToClipboard } from './useCopyToClipboard';

type FetchResult = {
   message: string;
};

interface PromiseFetchResult extends Response {
   message: string;
}

function TestComponent({ url }: { url: string }) {
   const [data, isLoading, error] = useFetch<FetchResult>(url);
   if (isLoading) return <div>Loading...</div>;
   if (data) return <div>Data: {(data as FetchResult).message}</div>;
   if (error) return <div>Error: {(error as Error).message}</div>;
   return <div>Запрос отклонен!</div>;
}

vi.mock('next/navigation', () => ({
   useQueryParams() {
      return {
         prefetch: () => null,
      };
   },
   useSearchParams() {
      return {
         prefetch: () => null,
      };
   },
}));

describe('Тесты кастомных хуков', () => {
   test('Тест хука useQueryParams', () => {
      const query = renderHook(() => useQueryParams('keyword', 'lorem ipsum'));

      expect(window.location.search.match(/keyword/i)).toBeTruthy();
      expect(window.location.search.match(/lorem/i)).toBeTruthy();
      expect(window.location.search.match(/ipsum/i)).toBeTruthy();

      query.unmount();
   });

   test('Тест хука useMediaQuery', () => {
      const query = renderHook(() => useMediaQuery('(prefers-color-scheme: dark)'));

      expect(query).toBeTruthy();

      query.unmount();
   });

   test('Тест хука useLocalStorage', () => {
      const testText = 'lorem ipsum';
      const localStorage = renderHook(() => useLocalStorage('keywords', testText));
      const {
         result: { current },
      } = localStorage;

      expect(current[0]).toBe(testText);

      localStorage.unmount();
   });

   test('Тест хука useLocalStorageSync', () => {
      const testText = 'lorem ipsum';
      const localStorage = renderHook(() => useLocalStorageSync('keywords', testText));
      const {
         result: { current },
      } = localStorage;

      expect(current[0]).toBe(testText);

      localStorage.unmount();
   });

   test('Тест хука useLockScroll', () => {
      vi.spyOn(document.body, 'addEventListener');
      expect(document.body.addEventListener).toHaveBeenCalledTimes(0);

      const lockScroll = renderHook(() => useLockScroll(true));

      expect(document.body.addEventListener).toHaveBeenCalledTimes(3);
      vi.spyOn(document.body, 'removeEventListener');
      expect(document.body.removeEventListener).toHaveBeenCalledTimes(0);

      lockScroll.unmount();

      expect(document.body.removeEventListener).toHaveBeenCalledTimes(3);
   });

   test('Тест хука useClickOutside', async () => {
      const target = document.createElement('aside') as HTMLTemplateElement;
      const outside = document.createElement('div');
      const ref = {
         current: target,
      };
      const callback = vi.fn();
      const hook = renderHook(() => useClickOutside(ref, callback));

      document.body.appendChild(target);
      document.body.appendChild(outside);

      expect(callback).toHaveBeenCalledTimes(0);

      await userEvent.click(outside);
      expect(callback).toHaveBeenCalledTimes(1);

      vi.spyOn(document, 'removeEventListener');
      hook.unmount();
      expect(document.removeEventListener).toHaveBeenCalledTimes(1);

      await userEvent.click(outside);
      expect(callback).toHaveBeenCalledTimes(1);
   });

   test('Тест хука usePlaceholder', async () => {
      const placeholder = 'lorem ipsum';
      const hook = renderHook(() => usePlaceholder(placeholder));
      const { unmount, result } = hook;
      const [ref, text] = result.current;

      expect(text).toBe(placeholder);

      render(<input type="text" ref={ref} placeholder={text} />);

      act(() => {
         ref.current?.focus();
      });

      unmount();

      expect(() => ref.current?.blur()).not.toThrow();
   });

   test('Тест возврата состояния загрузки хуком useFetch', async () => {
      const url = 'https://example.com/api';
      global.fetch = vi.fn(() => Promise.resolve({ message: 'Success' } as PromiseFetchResult));
      const { getByText } = render(<TestComponent url={url} />);

      expect(getByText('Loading...')).toBeInTheDocument();

      await waitFor(() => {
         expect(global.fetch).toHaveBeenCalledWith(url);
      });
   });

   test('Тест возврата ошибки хуком useFetch', async () => {
      const url = 'https://example.com/api';
      global.fetch = vi.fn(() => Promise.reject(new Error('Fetch error')));
      const { getByText } = render(<TestComponent url={url} />);

      await waitFor(() => {
         expect(getByText('Error: Fetch error')).toBeInTheDocument();
      });
   });

   test('Тест хука usePageBottom', () => {
      const hook = renderHook(() => usePageBottom());
      const { unmount, result } = hook;

      expect(result.current).toBe(false);

      Object.defineProperty(window, 'innerHeight', { value: 500 });
      Object.defineProperty(document.documentElement, 'scrollTop', { value: 500 });
      Object.defineProperty(document.documentElement, 'offsetHeight', { value: 1000 });

      act(() => {
         window.dispatchEvent(new Event('scroll'));
      });

      expect(result.current).toBe(true);

      unmount();
   });

   test('Тест хука useDeviceDetect', () => {
      const originalNavigator = { ...navigator };
      const androidUAgent =
         'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36';

      Object.defineProperty(window, 'navigator', {
         value: originalNavigator,
         configurable: true,
      });

      Object.defineProperty(window.navigator, 'userAgent', {
         value: androidUAgent,
         configurable: true,
      });

      const hook = renderHook(() => useDeviceDetect());
      const { unmount, result } = hook;

      expect(result.current.isMobile).toBeTruthy();
      unmount();
   });

   test('Тест хука useCopyToClipboard', async () => {
      const testText = 'Lorem ipsum!';

      Object.defineProperty(navigator, 'clipboard', {
         value: {
            writeText: vi.fn(),
         },
         configurable: true,
      });

      const hook = renderHook(() => useCopyToClipboard(1000));
      const { unmount, result } = hook;
      const [, handleCopy] = result.current;

      vi.useFakeTimers();
      (navigator.clipboard.writeText as Mock).mockResolvedValueOnce(undefined);

      await act(async () => {
         handleCopy(testText);
      });

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testText);
      const [isCopied] = result.current;
      expect(isCopied).toBeTruthy();

      act(() => {
         vi.advanceTimersByTime(1000);
      });

      const [isReseted] = result.current;
      expect(isReseted).toBeFalsy();

      unmount();

      expect(isReseted).toBeFalsy();
      vi.useRealTimers();
   });
});
