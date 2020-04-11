import { Global, Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { EsClientService } from './es-client.service';

@Global()
@Module({
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
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
