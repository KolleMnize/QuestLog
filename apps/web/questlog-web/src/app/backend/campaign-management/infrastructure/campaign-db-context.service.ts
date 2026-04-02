import { Injectable } from "@angular/core";
import { Campaign } from "../domain/entities/campaign.entitie";

@Injectable({
    providedIn: 'root',
})

export class CampaignDbContextService {

    _campaigns: Campaign[] = [];
    constructor() {
    }

    Add(Campaign: Campaign): void {
        this._campaigns.push(Campaign);
    }

    GetCampaigns(): Campaign[] {
        return this._campaigns;
    }

}