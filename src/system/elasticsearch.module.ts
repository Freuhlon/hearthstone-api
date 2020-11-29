import { Global, Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { EsClientService } from './es-client.service';
import {ConfigModule} from "../config/config.module";
import {ConfigService} from "../config/config.service";

@Global()
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTIC_SEARCH_URI'),
      }),
      inject: [ConfigService]
    }),
  ],
  providers: [
    EsClientService,
  ],
  exports: [
    EsClientService,
  ],
})
export class ESClientModule {

}
