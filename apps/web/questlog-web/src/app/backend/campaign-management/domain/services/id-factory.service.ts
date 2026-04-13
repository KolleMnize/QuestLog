import { Injectable } from "@angular/core";
import { Guid } from "../../../shared-kernel/guid.value-object"
import { ICampaignRepository } from "../repositories/campaign-repository.interface"
import { CampaignId } from "../value-objects/campaign-id.value-object";
import { CampaignDbContextService } from "../../infrastructure/campaign-db-context.service";

@Injectable({
    providedIn: 'root',
})

export class IdFactoryService {

    _campaignRepository: ICampaignRepository;

    constructor(campaignDbContextService: CampaignDbContextService) {
        this._campaignRepository = campaignDbContextService.CampaignRepository;
    }

    CreateNewCampaignId(): CampaignId {
        var newGuid: Guid;
        for (let tries = 1; tries <= 5; tries++) {
            newGuid = Guid.newGuid();
            const result = this._campaignRepository.existsCampaignById(newGuid)
            if (!result)
                return new CampaignId(newGuid);
        }
        throw new Error("Not able to create new CampaignId after five tries")
    }

    CreateCampaignIdFromGuid(id:Guid): CampaignId {
        const result = this._campaignRepository.existsCampaignById(id)
        if (result)
                return new CampaignId(id);
            else
               throw new Error("Campaign with Id: {{id}} not existing.") 

    }
}