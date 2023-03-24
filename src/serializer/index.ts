import { Serializer } from "./types";
import koinlySerializer from "./koinly";
import cryptotaxcalculatorSerializer from "./cryptotaxcalculator";
import genericSerializer from "./generic";

const serializers: Serializer[] = [
  koinlySerializer,
  cryptotaxcalculatorSerializer,
  genericSerializer,
];

export default serializers;
