import { HttpService, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EsClientService } from '../../system/es-client.service';
import { Card } from '../../model/card.model';
import { cardMapping } from '../../system/mappings/card.mapping';
import {ConfigService} from "../../config/config.service";

@Injectable()
export class CronService {

  private readonly logger = new Logger(CronService.name);
  private readonly INDEX_NAME = 'cards';

  constructor(private readonly esClientService: EsClientService, private readonly httpService: HttpService, private readonly configService: ConfigService) {
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async handleCron() {

    this.logger.log('Lancement du batch ...');

    const exists = await this.esClientService.indexExists(this.INDEX_NAME);

    if (exists.body) {
      this.logger.log(`L'index ${this.INDEX_NAME} existe déjà`);
      this.logger.log(`Supprésion de l'index ${this.INDEX_NAME}...`);

      await this.esClientService.deleteIndex(this.INDEX_NAME);
      this.logger.log('Index supprimé');

    } else {
      this.logger.log('Index innéxistant');
    }

    this.logger.log('Création de l\'index');
    await this.esClientService.createIndex(this.INDEX_NAME);
    this.logger.log('Création du mapping');
    await this.esClientService.mappings(this.INDEX_NAME, cardMapping);

    this.logger.log('Récupération des données');
    const cards: Array<Card> = (await this.httpService.get<Array<Card>>(this.configService.get('HEARTHSTONE_CARD_API_FRENCH')).toPromise()).data;

    const startTime = new Date().getTime();
    for (const card of cards) {
      await this.esClientService.addDocument(card.id, 'cards', card);
    }

    const endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000;

    this.logger.log(`Indéxation terminée, a duré : ${duration} secondes pour ${cards.length} cartes au total.`);
  }

}
