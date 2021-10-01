import mergeWith from 'lodash/mergeWith';

export const MergeIgnoringUndefined = (A, B) => mergeWith({}, A, B, (a, b) => b === undefined ? a : undefined);
