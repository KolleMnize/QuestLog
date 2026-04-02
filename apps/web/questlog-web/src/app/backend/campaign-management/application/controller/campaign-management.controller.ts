import { inject, Injectable } from '@angular/core';
import {CampaignManagementService} from "../application-services/campaign-management.service";
import { CreateCampaignCommand } from '../commands/create-campaign.command';
import { GetCampaignsQuery, GetCampaignsQueryResult } from '../queries/get-campaigns.query';

@Injectable({
    providedIn: 'root',
})
    

export class CampaignManagementController {

    private _campaignManagementService: CampaignManagementService = inject(CampaignManagementService);

    public async Post(command: CreateCampaignCommand): Promise<void> {
        await this._campaignManagementService.HandleCreateCommand(command);}

    public async Get(query: GetCampaignsQuery): Promise<GetCampaignsQueryResult> {
        return await this._campaignManagementService.HandleGetCampaigns(query);}

    constructor() {}
}