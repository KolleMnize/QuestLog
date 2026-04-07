import { Injectable } from "@angular/core";
import { Campaign } from "../domain/aggregates/campaign.aggregate";
import { CampaignRepository } from "./repositories/campaign.respsitory";

@Injectable({
    providedIn: 'root',
})

export class CampaignDbContextService {

    public readonly CampaignRepository: CampaignRepository;

    constructor() {
        this.CampaignRepository = new CampaignRepository();
    }

}