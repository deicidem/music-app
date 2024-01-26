import * as rules from "@vee-validate/rules";

export const useVeeRules = () => {
  type VeeRules = {
    [K in keyof typeof rules as CamelCase<K>]: K;
  };

  const veeRules: VeeRules = reactive(
    Object.keys(rules).reduce((map, key) => {
      map[camelCase(key)] = key;
      return map;
    }, {} as VeeRules),
  );
  return { ...veeRules };
};
