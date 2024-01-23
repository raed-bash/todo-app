export function getValuesFromStructure(
  value: any,
  structure: string | string[]
): string | undefined {
  const structureIsArray = Array.isArray(structure);
  const length = structure.length;
  if (value === undefined) return;
  if (length && structureIsArray) {
    const [str, ...otherStr] = structure;

    return getValuesFromStructure(value?.[str], otherStr);
  } else if (!length) return value;
  else if (!structureIsArray)
    return getValuesFromStructure(value, structure.split("."));
}
