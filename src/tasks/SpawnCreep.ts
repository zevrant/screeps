import {RandomNameGenerator} from "../utils/RandomNameGenerator";
import {ZevrantCreepMemory} from "../pojo/ZevrantCreepMemory";
import {CreepConstants} from "../constants/CreepConstants";

export class SpawnCreep implements WorkerTask {
  class: string;
  // @ts-ignore
  creep: StructureSpawn;
  outputs: Map<string, number>;
  requirements: Map<string, number>;
  priority: number = CreepConstants.PRIORITY_HIGHEST;
  // @ts-ignore
  private _sourceLocation: RoomObject;
  // @ts-ignore
  private _storageLocation: Structure;

  constructor() {
    this.class = "SpawnCreep"
    this.outputs = new Map();
    this.requirements = new Map();
    // @ts-ignore
    this.outputs.set(FIND_MY_CREEPS, 1);
    // @ts-ignore
    this.requirements.set(RESOURCE_ENERGY, 300);
  }

  assign(creep: StructureSpawn): void {
    this.creep = creep;
  }

  execute(): boolean {
    let room =  this._sourceLocation.room;
    if(room === undefined) {
      return false;
    }
    let memory: ZevrantCreepMemory = new ZevrantCreepMemory();
    console.log(this.creep.id + " " + this.creep.name)
    return this.creep.spawnCreep([MOVE, MOVE, MOVE, CARRY, WORK], RandomNameGenerator.generate(), {memory: memory}) == 0;
  }

  gatherRequirements(): boolean {
    return false;
  }


  get sourceLocation(): RoomObject {
    return this._sourceLocation;
  }

  set sourceLocation(value: RoomObject) {
    this._sourceLocation = value;
  }

  get storageLocation(): Structure {
    return this._storageLocation;
  }

  set storageLocation(value: Structure) {
    this._storageLocation = value;
  }

  isAssigned(): boolean {
    return this.creep === undefined;
  }

}
