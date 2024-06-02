/* eslint-disable react/prop-types */
export function SearchBox(props) {
  return (
    <div>
        <input type="text" placeholder="search by title" className="p-2 border rounded-lg w-1/2 outline-none" onChange={props.onchanges} value={props.values} name={props.names} onKeyDown={props.clicks}/>
    </div>
  )
}
