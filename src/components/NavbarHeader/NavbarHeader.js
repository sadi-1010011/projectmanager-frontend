import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import './NavbarHeader.css';
import settingsIcon from '../../img/settings.png';

function NavbarHeader() {

	// SET CURRENT TAB BASED ON CURRENT ROUTE
	let location = useLocation().pathname;
	location = location.substring(1);
	useEffect(() => {
		let i;
		const currentTab = document.getElementsByClassName('nav-link');
		// console.log('location: ',location); // check route
		for (i=0; i<currentTab.length; i++) {
			if ((currentTab[i].textContent).toLowerCase() === location) {
				// console.log(currentTab[i]) // apply class
				currentTab[i].parentElement.classList.add('active-tab');
			}
		}
	});

    return (
<header className="header-gradient">
	<div className="row p-3 text-center">
		<div className="col-sm-6 col-md-6 col-lg-3">
			<h2 className="navbar-brand">
				<a className="brand-title" href="/">projectManager</a>
			</h2>
		</div>

		<div className="col-sm-4 col-md-4 col-lg-6">
			<nav className="navbar navbar-expand navbar-dark justify-content-center">
				<div className="collapse navbar-collapse">
					<ul className="navbar-nav m-auto">
					  <li className="nav-item">
						  <Link to="/complete" className="nav-link" data-route="complete">
					    	complete
						  </Link>
					  </li>
					  <li className="nav-item">
							<Link to="/current" className="nav-link" data-route="current">
	   							current
							</Link>
					  </li>
						  <li className="nav-item">
							  <Link to="/coming" className="nav-link" data-route="coming">
						    	coming
							</Link>
					  </li>
					</ul>
				</div>
			</nav>
		</div>

		<div className="col-3 d-lg-block icons-wrapper">
			<div className="basket-wrapper">
				{/* 
                    -- DAY-NIGHT TOGGLE FEATURE --
                <div className="daynight-btn" onClick="darklightToggle();">
					<img src="img/lightbulb.svg" alt="cart" />
				</div>
                            -- DISABLED --
                */}
				<div className="basket-btn">
					<a href="/">
						<img src={settingsIcon} alt="cart" />
					</a>
				</div>
			</div>
		</div>
	</div>
</header>
    );
}

export default NavbarHeader;