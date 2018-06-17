import { Edition } from "./character.model";

export class Encumberance {
  edition: Edition;
  encumbered: number;
  heavilyEncumbered: number;
  maxCarry: number;
  drag: number;
  lift: number;
}