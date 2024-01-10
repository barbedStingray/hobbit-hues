

const projectDetails = (state = {}, action) => {
    switch (action.type) {
      case 'SET_PROJECT_DETAILS':
        return action.payload;
      case 'RESET_PROJECT_DETAILS':
        return state;
      default:
        return state;
    }
  };
  
  
export default projectDetails;