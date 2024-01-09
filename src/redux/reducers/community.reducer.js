

const communityProjects = (state = [], action) => {
    switch (action.type) {
      case 'SET_COMMUNITY_PROJECTS':
        return action.payload;
      default:
        return state;
    }
  };
  
  
export default communityProjects;