export default function InfoAlert() {
  return (
    <p className="color-info color-info-content text-center text-sm p-3 mr-2 mt-2 md:mr-3 md:mt-3 absolute top-0 right-0 rounded-full rounded-tr-none">
      <i>
        To access the demo, please log in using Email: <b>aak@aak.com</b> and
        Password: <b>#2004Aak</b>
      </i>
      <span className="color-warning absolute top-0 right-0 rounded-full h-3 w-3 animate-pulse mt-1 mr-1"></span>
    </p>
  );
}
