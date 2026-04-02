import { inject, Injectable } from '@angular/core';
import { Guid } from "../../../shared-kernel/guid.value-object";
import { Campaign } from "../../domain/entities/campaign.entitie";
import { CampaignDbContextService } from '../../infrastructure/campaign-db-context.service';
import { CreateCampaignCommand } from '../commands/create-campaign.command';
import { GetCampaignsQuery, GetCampaignsQueryResult, CampaignDto } from '../queries/get-campaigns.query';

@Injectable({
    providedIn: 'root',
})

export class CampaignManagementService {
    private _campaignDbContextService: CampaignDbContextService = inject(CampaignDbContextService);

    async HandleCreateCommand(command: CreateCampaignCommand): Promise<void> {
        var newCampaign = new Campaign(Guid.newGuid(), command.name);
        this._campaignDbContextService.Add(newCampaign);
    }

        async HandleGetCampaigns(query: GetCampaignsQuery): Promise<GetCampaignsQueryResult> {
        const campaigns = this._campaignDbContextService.GetCampaigns();
        const result: CampaignDto[] = []; 
        campaigns.forEach(element => {
            result.push({
                id: element.Id.Value,
                name: element.Name
            });
        });
        return { Campaigns: result };
    }
}