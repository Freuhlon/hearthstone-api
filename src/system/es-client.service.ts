import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map } from 'rxjs/operators';

@Injectable()
export class EsClientService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {

  }

  createIndex(indexName: string) {
    return this.elasticsearchService.indices.create({
      index: indexName,
    });
  }

  deleteIndex(indexName: string) {
    return this.elasticsearchService.indices.delete({
      index: indexName,
    });
  }

  indexExists(indexName: string) {
    return this.elasticsearchService.indices.exists({
      index: indexName,
    });
  }

  addDocument(id: string, index: string, document: object) {
    return this.elasticsearchService.index({
      index,
      id,
      body: document,
    });
  }

  search(index: string, name: string) {

    return fromPromise(this.elasticsearchService.search({
      index,
      body: {
        query: {
          bool: {
            must: [
              { match: { name: name } },
              { match: { type: 'MINION' } },
            ]
          }
        }
      },
    })).pipe(map((response: any) => response.body.hits.hits), map((hits: any[]) => hits.map(hit => hit._source)));
  }


  mappings(indexName: string, mapping: object) {
    return this.elasticsearchService.indices.putMapping({
      index: indexName,
      body: {
        properties: mapping,
      },
    });
  }

}
