import Clarity from '@microsoft/clarity';

export const initClarity = () => {
  if (typeof window !== 'undefined') {
    Clarity.init("prworlkt0j");
  }
};
