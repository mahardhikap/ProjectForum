export function ErrorGetData(props) {
  return (
    <div className="text-center py-40 border rounded-lg p-3 my-2">
      <p className="font-extrabold">{props.errorTitle}</p>
      <p>{props.errorNote}</p>
    </div>
  );
}
