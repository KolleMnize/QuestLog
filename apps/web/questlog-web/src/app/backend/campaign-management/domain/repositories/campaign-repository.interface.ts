import { Guid } from "../../../shared-kernel/guid.value-object";
import { Campaign } from "../aggregates/campaign.aggregate";

export interface ICampaignRepository {
    saveAsync(Campaign: Campaign): Promise<void>;
    getCampaigns(): Campaign[];
    getCampaignById(id: Guid): Campaign | undefined;
}