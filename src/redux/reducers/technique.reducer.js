

const techniqueList = (state = [], action) => {
    switch (action.type) {
      case 'SET_TECHNIQUES_DROPDOWN':
        return action.payload;
      default:
        return state;
    }
  };
  
  
export default techniqueList;