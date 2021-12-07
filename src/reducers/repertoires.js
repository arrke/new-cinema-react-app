export const repertoires = (state = [], action) => {
  // (1)
  switch (action.type) {
    case 'FETCH_REPERTOIRE_SUCCESS':
      return [...action.repertoires];
    default:
      return state;
  }
};