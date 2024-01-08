

function SelectTechnique(props) {


  return (
    <label><select
    name='techniques'
    className='selectBox'
    onChange={props.changeFunction(`${props.stringChange}`)}
>
    {props.techniqueList.map((technique) =>
        <option value={technique.id} key={technique.id}>{technique.technique}</option>
    )}
</select></label>
);
}

export default SelectTechnique;
