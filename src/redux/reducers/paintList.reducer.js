


const paintDetails = (state = [], action) => {
    switch (action.type) {
      case 'SET_PAINT_DETAILS':
        return action.payload;
      default:
        return state;
    }
  };
  
  
export default paintDetails;