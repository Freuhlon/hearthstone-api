import {INestApplication} from "@nestjs/common";
import {Test} from "@nestjs/testing";
import {CardService} from "../service/card.service";
import * as request from 'supertest';
import {SearchModule} from "../search.module";
import {CardController} from "./card.controller";
import {of} from "rxjs";

describe('Cards', () => {
    let app: INestApplication;
    let catsService = { search: () => of([]) };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [SearchModule],
            controllers: [CardController]
        })
            .overrideProvider(CardService)
            .useValue(catsService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET cards`, () => {
        return request(app.getHttpServer())
            .get('/cards?query=test')
            .expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});
