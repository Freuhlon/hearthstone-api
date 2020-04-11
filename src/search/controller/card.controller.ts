import { Controller, Get, Query } from '@nestjs/common';
import { CardService } from '../service/card.service';
import { Card } from '../../model/card.model';

@Controller('cards')
export class CardController {

  constructor(private readonly cardService: CardService) {
  }

  @Get()
  search(@Query('query') query = "") {
    return this.cardService.search(query);
  }
}
