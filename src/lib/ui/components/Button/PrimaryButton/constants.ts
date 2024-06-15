export const VARIANTS = {
  CONTAINED: 'CONTAINED',
  CONTAINED_DARK: 'CONTAINED_DARK',
  CONTAINED_LIGHT: 'CONTAINED_LIGHT',
  CONTAINED_INFO: 'CONTAINED_INFO',
  CONTAINED_WHITE: 'CONTAINED_WHITE',
  CONTAINED_DANGER: 'CONTAINED_DANGER',
  CONTAINED_SUCCESS: 'CONTAINED_SUCCESS',
  OUTLINED: 'OUTLINED',
  NONE: 'NONE',
  LINK: 'LINK',
  TEXT: 'TEXT',
  TEXT_DANGER: 'TEXT_DANGER',
};

export const VARIANTS_CLASS = {
  [VARIANTS.CONTAINED]:
    'border-none bg-blue-700 hover:bg-blue-900 text-white font-bold',
  [VARIANTS.CONTAINED_DARK]:
    'border-none bg-black hover:bg-neutral-600 text-white font-bold',
  [VARIANTS.CONTAINED_LIGHT]:
    'border-none bg-blue-600 hover:bg-blue-900 text-white font-bold',
  [VARIANTS.CONTAINED_WHITE]:
    'border-none bg-white hover:border-black-300 hover:bg-blue-700 text-black',
  [VARIANTS.CONTAINED_INFO]:
    'border-none bg-gray-400 hover:bg-gray-600 text-white',
  [VARIANTS.CONTAINED_SUCCESS]: 'bg-green-700 hover:bg-green-900 text-white',
  [VARIANTS.CONTAINED_DANGER]: 'bg-red-700 hover:bg-red-900 text-white',
  [VARIANTS.OUTLINED]:
    'border border-black hover:border-gray-700 hover:bg-neutral-200 hover:text-bold text-black ',
  [VARIANTS.NONE]:
    'border-none hover:border-black-300 hover:bg-gray-200  text-black',
  [VARIANTS.TEXT]: 'text-black  hover:underline',
  [VARIANTS.LINK]: 'text-blue-500  hover:underline',
  [VARIANTS.TEXT_DANGER]:
    'text-red-500 hover:border border-t-0 border-l-0 border-r-0 border-red-300',
};
