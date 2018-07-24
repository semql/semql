export interface Options {
  ignoreCase?: true,
  matchCase?: true,
  ignoreAccent?: true,
  matchAccent?: true,
  locale?: string,
  excludeUpper?: boolean,
  excludeLower?: boolean,
  excludeBounds?: boolean
  [optionName: string]: any | any[]
}

const optionAntonyms: {[optionName: string]: string[]} = {
  ignoreCase: ['matchCase'],
  ignoreAccent: ['matchAccent'],
  matchCase: ['ignoreCase'],
  matchAccent: ['ignoreAccent'],
};

export function addOption (options: Options, optionName: string, optionArgs: any[]): Options {
  const result = {
    ...options,
    [optionName]:
      optionArgs.length === 0 ?
        true :
        optionArgs.length === 1 ?
          optionArgs[0] :
          optionArgs
  };
  const antonyms = optionAntonyms[optionName];
  if (antonyms) {
    for (const antonym of antonyms)  {
      delete result[antonym];
    }
  }
  return result;
}

export function combineOptions (options1: Options, options2: Options): Options {
  return Object.keys(options2)
    .reduce(
      (result, option) => addOption(result, option, options2[option]), 
      options1);
}
