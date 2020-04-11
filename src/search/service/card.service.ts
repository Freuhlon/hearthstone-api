import { Injectable } from '@nestjs/common';
import { EsClientService } from '../../system/es-client.service';

@Injectable()
export class CardService {

  constructor(private readonly esClientService: EsClientService) {
  }

  search(query: string) {
    return this.esClientService.search('cards', query);
  }
}
