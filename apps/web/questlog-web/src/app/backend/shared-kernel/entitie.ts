import { Guid } from "./guid.value-object";

export abstract class Entitie {
    Id!: Guid;

    equals(other: Entitie): boolean {
        {
            return other.Id.equals(this.Id);
        }
    }
}