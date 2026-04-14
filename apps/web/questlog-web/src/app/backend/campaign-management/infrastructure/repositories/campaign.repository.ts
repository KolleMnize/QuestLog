import { Guid } from "../../../shared-kernel/guid.value-object";
import { Campaign } from "../../domain/aggregates/campaign.aggregate";
import { ICampaignRepository } from "../../domain/repositories/campaign-repository.interface";
import { CampaignChapterId } from "../../domain/value-objects/campaign-chapter-id.value-object";
import { CampaignId } from "../../domain/value-objects/campaign-id.value-object";

export class CampaignRepository implements ICampaignRepository {
    _campaigns: Campaign[] = [];


    constructor() {

        const campaignId = new CampaignId(Guid.newGuid());

        const testCampaign = Campaign.rehydrate(campaignId, "Test Campaign");
        testCampaign.addChapter(new CampaignChapterId(Guid.newGuid()), "Test Chapter1")
        testCampaign.addChapter(new CampaignChapterId(Guid.newGuid()), "Test Chapter2");
        testCampaign.addChapter(new CampaignChapterId(Guid.newGuid()), "Test Chapter3");

        const chapter1 = testCampaign.Chapters[0];
        const chapter3 = testCampaign.Chapters[2];

        testCampaign.addSubChapter(chapter1.Id, new CampaignChapterId(Guid.newGuid()), "Test SubChapter 1.1");
        testCampaign.addSubChapter(chapter1.Id, new CampaignChapterId(Guid.newGuid()), "Test SubChapter 1.2");
        testCampaign.addSubChapter(chapter3.Id, new CampaignChapterId(Guid.newGuid()), "Test SubChapter 3.1");

        const chapter11 = chapter1.SubChapters[0];

        testCampaign.addSubChapter(chapter11.Id, new CampaignChapterId(Guid.newGuid()), "Test SubChapter 1.1.1");

        this._campaigns.push(testCampaign)

    }

    getCampaignById(id: CampaignId): Campaign {
        const result = this._campaigns.find(campaign => campaign.Id.equals(id));
        if (!result)
            throw new Error(`Campaign with ID ${id} not found.`);
        else
            return result;
    }

    getCampaignByChapterId(id: CampaignChapterId): Campaign {
        throw new Error("Method not implemented.");
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
        if (!this.existsCampaignById(Campaign.Id)) {
            this.add(Campaign);
        }
        else
            this.update(Campaign);

        return Promise.resolve();
    }

    getCampaigns(): Campaign[] {
        return this._campaigns;
    }

    existsCampaignById(id: CampaignId): boolean {
        return this._campaigns.some(campaign => campaign.Id.equals(id));
    }

    existsCampaignChapterById(id: CampaignChapterId): boolean {
        throw new Error("Method not implemented.");
    }


}