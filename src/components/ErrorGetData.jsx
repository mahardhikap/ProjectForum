export function ErrorGetData(props) {
  return (
    <div className="text-center py-40 rounded-lg p-3 my-2 bg-white shadow-[1px_1px_10px_rgba(0,0,0,0.1)]">
      <p className="font-extrabold">{props.errorTitle}</p>
      <p>{props.errorNote}</p>
    </div>
  );
}
