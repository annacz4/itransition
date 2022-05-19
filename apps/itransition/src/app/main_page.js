import { NavLink } from "react-bootstrap";
import SearchBar from "./components/search";


const Header = () => {
    return (
        <header>
            <h1>Collection Management App</h1>
            <div>
                <NavLink to="/" className="navigationLinks" activeClassName="active">Collections</NavLink>
                <NavLink to="/" className="navigationLinks" activeClassName="active">Collections</NavLink>
            </div>
        </header>
    )
}

<SearchBar />