import {EsClientService} from "../../system/es-client.service";
import {CardService} from "./card.service";
import {ElasticsearchService} from "@nestjs/elasticsearch";
import {of} from "rxjs";

describe('CardService', () => {

    let esClientService: EsClientService;
    let cardService: CardService;
    let eslasticsearchService: ElasticsearchService;

    beforeAll(()=> {
        esClientService = new EsClientService(eslasticsearchService);
        cardService = new CardService(esClientService);
        jest.spyOn(esClientService, 'search').mockImplementation(args => of([]));
    });

    it('Recherche avec un critère', ()=>{
        cardService.search('').subscribe(response => {
            expect(esClientService.search).toHaveBeenCalled();
            expect(response).toEqual([]);
        });
    });
});
