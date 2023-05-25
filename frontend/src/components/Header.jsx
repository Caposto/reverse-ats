function Header() {
  return (
    <div className="flex justify-between h-16 border-2 items-center">
      <div className="pl-4">
        <svg width="20" height="20">
          <rect width="20" height="20" />
        </svg>
      </div>
      <h1 className="text-2xl">Reverse-ATS</h1>
      <div className="pr-4">
        <svg width="20" height="20">
          <rect width="20" height="20" />
        </svg>
      </div>
    </div>
  );
}

export default Header;
