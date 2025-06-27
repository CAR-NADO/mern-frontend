const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>
      <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-800">
        <a href="#">Product</a>
        <a href="#">Features</a>
        <a href="#">Marketplace</a>
        <a href="#">Company</a>
      </nav>
      <div className="text-sm font-medium text-gray-800">
        {/* <a href="#">Log in →</a> */}
      </div>
    </header>
  );
};

export default Header;
