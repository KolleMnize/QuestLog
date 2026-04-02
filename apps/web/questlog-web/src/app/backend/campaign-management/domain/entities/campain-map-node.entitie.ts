export class CampaignMapNode {
    private _id? : number;
    private _parent? : CampaignMapNode;

    get Id(): number| undefined {return this._id;}
    Name : string;
    get Parent(): CampaignMapNode | undefined {return this._parent;}
    readonly children : CampaignMapNode[] = [];
    isActive : boolean = true;

    constructor(id?: number, name: string = '') {
        this._id = id;
        this.Name = name;
    }

    addChild(child: CampaignMapNode) {
        this.children.push(child);
        child._parent = this;
    }
}
