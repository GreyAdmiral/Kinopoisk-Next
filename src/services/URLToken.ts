const xorNumber = 25;

export class URLToken {
   static encrypt(url: string = ''): string {
      const xored = Array.from(url)
         .map((char) => String.fromCharCode(char.charCodeAt(0) ^ xorNumber))
         .join('');
      const reversed = xored.split('').reverse().join('');

      return Buffer.from(reversed).toString('base64');
   }

   static decrypt(token: string = ''): string {
      const step1 = Buffer.from(token, 'base64').toString('utf8');
      const step2 = step1.split('').reverse().join('');
      const step3 = step2
         .split('')
         .map((char) => String.fromCharCode(char.charCodeAt(0) ^ xorNumber))
         .join('');

      return step3;
   }
}
