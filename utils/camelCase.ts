export default (str: string) => {
  return str.replace(/_([a-z])/g, g => g[1].toUpperCase())
}
export type CamelCase<T> = T extends `${infer P1}_${infer P2}${infer P3}`
  ? `${P1}${Uppercase<P2>}${CamelCase<P3>}`
  : T;
