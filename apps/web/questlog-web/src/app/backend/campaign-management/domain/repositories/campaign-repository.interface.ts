import { Guid } from "../../../shared-kernel/guid.value-object";
import { Campaign } from "../aggregates/campaign.aggregate";
import { CampaignChapterId } from "../value-objects/campaign-chapter-id.value-object";
import { CampaignId } from "../value-objects/campaign-id.value-object";

export interface ICampaignRepository {
    saveCampaign(Campaign: Campaign): Promise<void>;
    getCampaigns(): Campaign[];
    getCampaignById(id: CampaignId): Campaign | undefined;
    getCampaignByChapterId(id: CampaignChapterId): Campaign | undefined;
    existsCampaignById(id: CampaignId): boolean;
    existsCampaignChapterById(id: CampaignChapterId): boolean;


}