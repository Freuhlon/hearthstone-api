import { Module } from '@nestjs/common';
import { ESClientModule } from '../system/elasticsearch.module';
import { CardService } from './service/card.service';
import {CardController} from "./controller/card.controller";

@Module({
  imports: [ESClientModule],
  providers: [CardService],
  controllers: [CardController],
})
export class SearchModule {

}
