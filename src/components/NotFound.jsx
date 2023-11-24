function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <div className="z-10 p-4 w-screen h-screen flex justify-center items-center flex-col">
        <h2 className="font-extrabold text-3xl text-center text-black">404</h2>
        <p className="text-xl font-medium text-black text-center">
          Page is not found
        </p>
      </div>
    </div>
  );
}

export default NotFound;
