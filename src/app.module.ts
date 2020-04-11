import {Module} from '@nestjs/common';
import {SearchModule} from './search/search.module';
import {BatchModule} from './batch/batch.module';
import {CardController} from './search/controller/card.controller';

@Module({
    imports: [
        SearchModule,
        BatchModule
    ],
    controllers: [CardController]
})
export class AppModule {
}
