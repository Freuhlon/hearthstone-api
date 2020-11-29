import {Controller, Get, Query} from '@nestjs/common';
import {CardService} from '../service/card.service';
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('cards')
@Controller('cards')
export class CardController {

    constructor(private readonly cardService: CardService) {
    }

    @Get()
    @ApiOperation({summary: "Search cards through a query, empty query retrieves all cards."})
    @ApiResponse({status: 200, description: 'Cards has been successfully found.'})
    @ApiQuery({ name: 'query', allowEmptyValue: true, description: 'ESQuery' })
    search(@Query('query') query = "") {
        return this.cardService.search(query);
    }
}
