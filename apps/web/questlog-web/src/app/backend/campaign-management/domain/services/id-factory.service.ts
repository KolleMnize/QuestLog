import { Injectable } from "@angular/core";
import { Guid } from "../../../shared-kernel/guid.value-object"
import { ICampaignRepository } from "../repositories/campaign-repository.interface"
import { CampaignId } from "../value-objects/campaign-id.value-object";
import { CampaignDbContextService } from "../../infrastructure/campaign-db-context.service";
import { CampaignChapterId } from "../value-objects/campaign-chapter-id.value-object";

@Injectable({
    providedIn: 'root',
})

export class IdFactoryService {

    _campaignRepository: ICampaignRepository;

    constructor(campaignDbContextService: CampaignDbContextService) {
        this._campaignRepository = campaignDbContextService.CampaignRepository;
    }

    CreateNewCampaignId(): CampaignId {
        var newId: CampaignId;
        for (let tries = 1; tries <= 5; tries++) {
            newId = new CampaignId(Guid.newGuid());
            const result = this._campaignRepository.existsCampaignById(newId)
            if (!result)
                return newId;
        }
        throw new Error("Not able to create new CampaignId after five tries")
    }

    CreateCampaignIdFromGuid(id: Guid): CampaignId {
        const returnId = new CampaignId(id)
        const result = this._campaignRepository.existsCampaignById(returnId)
        if (result)
            return returnId;
        else
            throw new Error("Campaign with Id: {{id}} not existing.")

    }

    CreateNewCampaignChapterId(): CampaignChapterId {
        var newId: CampaignChapterId;
        for (let tries = 1; tries <= 5; tries++) {
            newId = new CampaignChapterId(Guid.newGuid());
            const result = this._campaignRepository.existsCampaignChapterById(newId)
            if (!result)
                return newId;
        }
        throw new Error("Not able to create new CampaignId after five tries")
    }

    CreateCampaignChapterIdFromGuid(id: Guid): CampaignChapterId {
        const returnId = new CampaignChapterId(id)
        const result = this._campaignRepository.existsCampaignChapterById(returnId)
        if (result)
            return returnId;
        else
            throw new Error("Campaign with Id: {{id}} not existing.")

    }
}