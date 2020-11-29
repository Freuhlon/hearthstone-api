import {Module} from '@nestjs/common';
import {SearchModule} from './search/search.module';
import {BatchModule} from './batch/batch.module';
import {AppController} from "./app.controller";

@Module({
    imports: [
        SearchModule,
        BatchModule
    ],
    controllers: [AppController]
})
export class AppModule {
}
