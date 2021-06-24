import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Footer = () => {
    const  location = useLocation()

    return (
        <footer>
            <p>CopyRight &copy; 2021</p>
            {location.pathname === '/' ? (<Link to = '/about'>About</Link>) : (<Link to = "/">Go Back</Link>)}
        </footer>
    )
}

export default Footer
