export default function handleMeasures(value, measure) {
  return measure === "kg" ? value.toFixed(3) : value;
}
