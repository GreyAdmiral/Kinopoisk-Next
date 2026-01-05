const xorNumber = 25;

export class URLToken {
   static encrypt(url: string = ''): string {
      // Используем TextEncoder для корректной работы с Unicode
      const encoder = new TextEncoder();
      const bytes = encoder.encode(url);

      // XOR и reverse в одной операции для эффективности
      const processed = new Uint8Array(bytes.length);

      for (let i = 0; i < bytes.length; i++) {
         processed[bytes.length - 1 - i] = bytes[i] ^ xorNumber;
      }

      // Используем base64url (URL-safe)
      return Buffer.from(String.fromCharCode(...processed))
         .toString('base64')
         .replace(/\+/g, '-')
         .replace(/\//g, '_')
         .replace(/=/g, '');
   }

   static decrypt(token: string = ''): string {
      try {
         // Восстанавливаем стандартный base64
         let base64 = token.replace(/-/g, '+').replace(/_/g, '/');
         const pad = base64.length % 4;

         if (pad) {
            base64 += '='.repeat(4 - pad);
         }

         // Декодируем base64
         const binary = Buffer.from(base64, 'base64').toString('utf8');
         const bytes = new Uint8Array(binary.length);

         for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
         }

         // Reverse и XOR в одной операции
         const decoded = new Uint8Array(bytes.length);

         for (let i = 0; i < bytes.length; i++) {
            decoded[i] = bytes[bytes.length - 1 - i] ^ xorNumber;
         }

         // Декодируем в строку
         return new TextDecoder('utf-8').decode(decoded);
      } catch (err) {
         console.error('URLToken:', err);
         return '';
      }
   }
}
