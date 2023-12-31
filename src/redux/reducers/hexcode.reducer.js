
const hexcode = (state = '#hexcode', action) => {
    switch (action.type) {
      case 'SET_PRIMARY_HEXCODE':
        return action.payload;
      default:
        return state;
    }
  };
  
  
export default hexcode;