
function handleObjectChange(e, activity, object) {
    const { name, value } = e.target;
    activity({ ...object, [name]: value })
}

module.exports = handleObjectChange;
