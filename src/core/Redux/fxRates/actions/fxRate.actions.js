
export const FX_RATE = 'FX_RATE';
export const FX_RATE_SUCCESS = 'FX_RATE_SUCCESS';
export const FX_RATE_FAIL = 'FX_RATE_FAIL';

/**
 * invite user action
 */
export const fxrate = (currency, conversionRate) => ({ type: FX_RATE,currency, conversionRate });

