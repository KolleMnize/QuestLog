import { Guid } from "../../../shared-kernel/guid.value-object";
import { Campaign } from "../../domain/aggregates/campaign.aggregate";
import { ICampaignRepository } from "../../domain/repositories/campaign-repository.interface";
import { CampaignId } from "../../domain/value-objects/campaign-id.value-object";

export class CampaignRepository implements ICampaignRepository {
    _campaigns: Campaign[] = [];


    constructor() {

        const campaignId = new CampaignId(Guid.newGuid());

        const testCampaign = Campaign.rehydrate(campaignId, "Test Campaign");
        testCampaign.addChapter("Test Chapter1")
        testCampaign.addChapter("Test Chapter2");
        testCampaign.addChapter("Test Chapter3");

        const chapter1 = testCampaign.Chapters[0];
        const chapter3 = testCampaign.Chapters[2];

        testCampaign.addSubChapter(chapter1.Id, "Test SubChapter 1.1");
        testCampaign.addSubChapter(chapter1.Id, "Test SubChapter 1.2");
        testCampaign.addSubChapter(chapter3.Id, "Test SubChapter 3.1");

        const chapter11 = chapter1.SubChapters[0];

        testCampaign.addSubChapter(chapter11.Id, "Test SubChapter 1.1.1");

        this._campaigns.push(testCampaign)

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

    saveCampaign(Campaign: Campaign): Promise<void> {
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

    existsCampaignById(id: Guid): boolean {
        return this._campaigns.some(campaign => campaign.Id.equals(id));
    }


}