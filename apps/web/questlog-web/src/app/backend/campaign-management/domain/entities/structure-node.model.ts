export class StructureNodeModel {
    private _id? : number;
    private _parent? : StructureNodeModel;

    get Id(): number| undefined {return this._id;}
    name : string;
    get Parent(): StructureNodeModel | undefined {return this._parent;}
    readonly children : StructureNodeModel[] = [];
    isActive : boolean = true;

    constructor(id?: number, name: string = '') {
        this._id = id;
        this.name = name;
    }

    addChild(child: StructureNodeModel) {
        this.children.push(child);
        child._parent = this;
    }
}
