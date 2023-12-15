export function SearchBox(props) {
  return (
    <div>
        <input type="text" placeholder="search by title (enter to search)" className="p-2 border rounded-lg w-1/2 outline-none" onChange={props.onchanges} value={props.values} name={props.names} onKeyDown={props.clicks}/>
    </div>
  )
}
