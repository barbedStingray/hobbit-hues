
const setPaintsDropdown = (state = [], action) => {
    switch (action.type) {
      case 'SET_PAINTS_DROPDOWN':
        return action.payload;
      default:
        return state;
    }
  };
  
  
export default setPaintsDropdown;