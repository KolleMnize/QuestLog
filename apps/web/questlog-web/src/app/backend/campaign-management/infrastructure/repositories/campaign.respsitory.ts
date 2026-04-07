import { Guid } from "../../../shared-kernel/guid.value-object";
import { Campaign } from "../../domain/aggregates/campaign.aggregate";
import { ICampaignRepository } from "../../domain/repositories/campaign-repository.interface";

export class CampaignRepository implements ICampaignRepository {
    _campaigns: Campaign[] = [];

    constructor() {
    }

    getCampaignById(id: Guid): Campaign | undefined {
        return this._campaigns.find(campaign => campaign.Id.equals(id));
    }

    private add(Campaign: Campaign): void {
        this._campaigns.push(Campaign);
    }

    private update(Campaign: Campaign): void {
        const index = this._campaigns.findIndex(c => c.Id.equals(Campaign.Id));
        if (index !== -1) {
            this._campaigns[index] = Campaign;
        }
    }

    saveAsync(Campaign: Campaign): Promise<void> {
        if (!this.getCampaignById(Campaign.Id)) {
            this.add(Campaign);
        }
        else 
            this.update(Campaign);

        return Promise.resolve();
    }

    getCampaigns(): Campaign[] {
        return this._campaigns;
    }


}