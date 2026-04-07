export interface GetCampaignsQuery {
}

export interface GetCampaignsQueryResult {
     Campaigns: CampaignDto[];
}

export  interface CampaignDto {
    id: string;
    name: string;
    chapters: CampaignChapterDto[];
}

export interface CampaignChapterDto {
    id: string;
    name: string;
}