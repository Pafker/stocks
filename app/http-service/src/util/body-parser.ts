import { RouterContext } from '../../deps.ts';

const decoder = new TextDecoder();

const parseRecursively = (string: string, keys: string[]): object => {
  const keysPositions: number[] = keys.map((key: string) => string.indexOf(key));
  const keysWithValues: number[] = keysPositions.filter((position: number) => position >= 0);
  const sortedPositions: number[] = keysWithValues.sort((a: number, b: number) => a - b);

  const loop = (
    string: string,
    keys: string[],
    index: number,
    result: object,
  ): object => {
    if (index === keys.length) {
      return result;
    }
    const object: any = { ...result };
  
    const key: string = keys[index];
    if (!string.includes(key)) {
      object[key] = '';
      return loop(string, keys, index + 1, object);
    }
  
    const keyPosition: number = string.indexOf(key);
    const valuePosition: number = keyPosition + key.length + 1;

    const [nextPosition] = sortedPositions.filter((position: number) => position > valuePosition);

    const value: string = string.slice(valuePosition, nextPosition && nextPosition - 1);
    object[key] = value;
    return loop(string, keys, index + 1, object);
  };

  return loop(string, keys, 0, {});
}

export default async (ctx: RouterContext, fields: string[]) => {
  try {
    if (fields.length === 0) {
      return {};
    }

    const unique = [...new Set(fields)];

    const buffer = new Uint8Array(1024);
    const reader = await ctx.request.body({ asReader: true });
    const numBytesRead = await reader.value.read(buffer) || 0;
    const bodyText = decoder.decode(buffer.subarray(0, numBytesRead));

    const decoded = decodeURIComponent(bodyText);

    try {
      return JSON.parse(decoded);
    } catch {
      return parseRecursively(decoded, unique);
    }
  } catch (error) {
    throw error;
  }
};