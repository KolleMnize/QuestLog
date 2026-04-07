import { Guid } from "./guid.value-object";

export abstract class Entity {
    Id!: Guid;

    equals(other: Entity): boolean {
        {
            return other.Id.equals(this.Id);
        }
    }
}