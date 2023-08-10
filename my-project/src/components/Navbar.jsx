import { Link } from "react-router-dom"

 
 

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center gap-10 p-3 font-bold text-lg shadow-md">
      <Link to="/">Home</Link>
      <Link to="/create">Create-Blog</Link>
    </nav>
  )
}

export default Navbar
