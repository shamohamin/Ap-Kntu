import {ToggleLink} from './ToggleLink';
import { URLS } from "../../redux/REST-data/URLS";
import { GITURL } from '../../redux/Types/Types';

export const Navbar = () => {

    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button style={{outline:'0px solid transparent'}} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span  className="navbar-toggler-icon"></span>
        </button>
        <span className="navbar-brand">AP</span>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <ToggleLink href="/" name="Home"/>
                </li>
                {/* <li className="nav-item active">
                    <ToggleLink href="/leaderboard/1" exact={false}
                                name="Leaderboard" />
                </li> */}
                <li className="nav-item">
                    <ToggleLink href="/homeworks" name="HomeWorks"/>
                </li>
                <li className="nav-item">
                    <ToggleLink href="/register" name="Register" />
                </li>
                <li>
                    <a target="_blank" style={{float:"left", marginLeft:'4px' , paddingTop:'4px', marginTop:'6px' , cursor:'pointer' ,color:'orange' , paddingRight : '8px'}} href={URLS[GITURL]} rel="noopener noreferrer"  arial-hidden="true"><span className="fab fa-gitlab"><span style={{paddingRight:'2px'}}> Gitlab </span></span> </a>
                </li>
            </ul>
        </div>
    </nav>
}