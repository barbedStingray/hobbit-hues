

const userProjects = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_PROJECTS':
        return action.payload;
      default:
        return state;
    }
  };
  
  
export default userProjects;