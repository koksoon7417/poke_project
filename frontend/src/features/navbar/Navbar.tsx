import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { signout } from "../auth/authSlice";
import './Navbar.css';
import { GiHamburgerMenu } from 'react-icons/gi';

export const Navbar = () => {
    const dispatch = useAppDispatch();
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    return (
        <nav className="navigation">
            <button
                className="hamburger"
                onClick={() => {
                    setIsNavExpanded(!isNavExpanded);
                }}
            >
                <GiHamburgerMenu color="white" size={16} />
            </button>
            <div
                className={
                    isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                }
            >
                <ul>
                    <li>
                        <Link to="/catchPokemon" onClick={() => { setIsNavExpanded(!isNavExpanded) }} >Catch Pokemon</Link>
                    </li>
                    <li>
                        <Link to="/myPokemon" onClick={() => { setIsNavExpanded(!isNavExpanded) }}>My Pokemon</Link>
                    </li>
                    <li>
                        <Link to="/unownedPokemon" onClick={() => { setIsNavExpanded(!isNavExpanded) }} >Unowned Pokemon</Link>
                    </li>
                    <li>
                        <Link to="/logout" onClick={() => {
                            setIsNavExpanded(!isNavExpanded);
                            dispatch(signout())
                        }}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
