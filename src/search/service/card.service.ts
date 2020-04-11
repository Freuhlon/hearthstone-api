import { Injectable } from '@nestjs/common';
import { EsClientService } from '../../system/es-client.service';
import {Observable} from "rxjs";

@Injectable()
export class CardService {

  constructor(private readonly esClientService: EsClientService) {
  }

  search(query: string): Observable<any[]> {
    return this.esClientService.search('cards', query);
  }
}
