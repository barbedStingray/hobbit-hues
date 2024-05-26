
// sets community projects page
const setCommunityList = (dispatch) => {
    console.log(`setting the community list`);
    dispatch({ type: 'FETCH_COMMUNITY_PROJECTS' });
};

module.exports = setCommunityList;

