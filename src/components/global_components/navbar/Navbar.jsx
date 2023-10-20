import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
      <img src="/img/ve_logo.svg" style={{width: "100px", height: "auto"}} />
        <div className="navItems">
          <button className="text-white">Register</button>
          <button className="text-white pl-7">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar