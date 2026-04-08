import { CampaignDto } from "../dtos/campaign-dto.interface";

export interface GetCampaignsQuery {
}

export interface GetCampaignsQueryResult {
     Campaigns: CampaignDto[];
}

