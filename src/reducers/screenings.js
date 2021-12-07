export const screenings = (state = [], action) => {
  // (1)
  switch (action.type) {
    case 'FETCH_SCREENING_SUCCESS':
      return [...action.screenings];
    default:
      return state;
  }
};