export function SearchBox(props) {
  return (
    <div>
        <input type="text" placeholder="search by title (enter to search), enter again to reset" className="p-3 border rounded-lg w-full outline-none" onChange={props.onchanges} value={props.values} name={props.names} onKeyDown={props.clicks}/>
    </div>
  )
}
