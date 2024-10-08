import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUsernameSearch(dfsd: string) {
    return {
      name: "joe",
      addy: "1337 leet st",
      pone: "4204206969"
    }
  }
}
