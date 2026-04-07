import { Guid } from "../../../shared-kernel/guid.value-object";
import { ICampaignRepository } from "../repositories/campaign-repository.interface";

export class CampaignId {

    private _campaignRepository: ICampaignRepository;

    readonly Value: Guid;

    constructor(value: Guid, CampaignRepository: ICampaignRepository) {
        this._campaignRepository = CampaignRepository;
        this.validate(value);
        this.Value = value;
    }

    private async validate(value: Guid): Promise<void> {
        const existingCampaign = await this._campaignRepository.getCampaignById(value);
        if (existingCampaign === null) {
            throw new Error(`A campaign with the ID ${value} does not exist.`);
        }
    }

}