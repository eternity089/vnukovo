export default function Container({
  children,
  className = ""
}) {

  return (
    <div
      className={`mx-3 lg:mx-12 ${className} `}>
      {children}
    </div>
  );
}