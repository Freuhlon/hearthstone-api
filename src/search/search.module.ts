import { Module } from '@nestjs/common';
import { ESClientModule } from '../system/elasticsearch.module';
import { CardService } from './service/card.service';

@Module({
  imports: [ESClientModule],
  exports: [CardService],
  providers: [CardService],
  controllers: [],
})
export class SearchModule {

}
