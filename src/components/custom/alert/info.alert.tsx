export default function InfoAlert() {
  return (
    <p className="color-info color-info-content text-center text-xs p-2 pl-5 mr-2 mt-2 md:mr-3 md:mt-3 absolute top-0 left-1 w-2xs rounded-full rounded-tl-none">
      <i>
        Email: <b>aak@aak.com</b> and
        Password: <b>#2004Aak</b>
      </i>
      <span className="color-warning absolute top-1 left-2 rounded-full h-2 w-2 animate-pulse"></span>
    </p>
  );
}
