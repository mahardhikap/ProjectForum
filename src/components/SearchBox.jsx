export function SearchBox(props) {
  return (
    <div>
        <input type="text" placeholder="search by title (enter to search)" className="p-3 border rounded-lg w-full outline-none" onChange={props.onchanges} value={props.values} name={props.names} onKeyDown={props.clicks}/>
    </div>
  )
}
