import { Entity } from "../../../shared-kernel/entity";
import { Guid } from "../../../shared-kernel/guid.value-object";

export class CampaignChapter extends Entity {

    private _parent? : CampaignChapter;
    private _name? : string;

    get Name(): string { return this._name || ''; }
    get Parent(): CampaignChapter | undefined {return this._parent;}
    readonly children : CampaignChapter[] = [];
    isActive : boolean = true;

    constructor(id: Guid, name: string) {
        super();
        this.Id = id;
        this._name = name;
    }

    addChild(child: CampaignChapter) {
        this.children.push(child);
        child._parent = this;
    }
}
