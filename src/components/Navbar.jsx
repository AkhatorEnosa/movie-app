const Navbar = () => {
  return (
    <nav className="w-full flex justify-center items-center mb-5 py-4 lg:mb-10 sticky top-0 bg-black/20 backdrop-blur-sm z-50">
      <a href="/" className="w-full flex justify-center items-center gap-2">
        <img src="/logo.png" alt="logo" className="size-10"/>
        <h2>MOOVEES</h2>
      </a>
    </nav>
  )
}

export default Navbar