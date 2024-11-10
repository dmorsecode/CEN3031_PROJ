import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="navbar bg-base-100 border-b border-neutral">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Home</Link>
        <Link to="/recipe" className="btn btn-ghost text-xl">Recipe</Link>
        <Link to="/recipe/create" className="btn btn-ghost text-xl">Create New Recipe</Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between" href="http://localhost:8000/accounts/google/login/">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
