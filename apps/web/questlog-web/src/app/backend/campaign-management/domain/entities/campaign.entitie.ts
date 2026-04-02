import { Entitie } from "../../../shared-kernel/entitie";
import { Guid } from "../../../shared-kernel/guid.value-object";

export class Campaign extends Entitie {
    private _name: string;
    
    get Name(): string { return this._name; }

    constructor(id: Guid, name: string) {
        super();
        this.Id = id;
        this._name = name;
    }
}