import { Guid } from "../../../shared-kernel/guid.value-object";

export class CampaignId {
    readonly Value: Guid;

    constructor(value: Guid) {
        this.Value = value;
    }
}