import { Astrolabe } from '../data/types';
import { kot, PalaceKey, PalaceName } from '../i18n';

export const getPalace = ($: Astrolabe, indexOrName: number | PalaceName) => {
  if (typeof indexOrName === 'number') {
    if (indexOrName < 0 || indexOrName > 11) {
      throw new Error('invalid palace index.');
    }

    return $.palaces[indexOrName];
  }

  return $.palaces.find((item) => {
    if (kot<PalaceKey>(indexOrName) === 'originalPalace' && item.isOriginalPalace) {
      return item;
    }

    if (kot<PalaceKey>(indexOrName) === 'bodyPalace' && item.isBodyPalace) {
      return item;
    }

    if (kot<PalaceName>(item.name) === kot<PalaceName>(indexOrName)) {
      return item;
    }
  });
};
