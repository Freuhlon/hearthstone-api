import {HttpModule, Module} from '@nestjs/common';
import {CronService} from './service/cron.service';
import {ScheduleModule} from '@nestjs/schedule';
import {ESClientModule} from '../system/elasticsearch.module';
import {ConfigModule} from "../config/config.module";

@Module({
    providers: [CronService],
    exports: [],
    imports: [
        ScheduleModule.forRoot(),
        ESClientModule,
        HttpModule,
        ConfigModule
    ],
})
export class BatchModule {

}
