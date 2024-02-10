import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
<nav className="navbar navbar-expand-lg bg-gradient-to-r from-red-500 to-yellow-500" >
			<div className="container">
				<NavLink className="navbar-brand color:white" hrefLang="https://zeruhabesha.github.io/my_personal_portofilo/" to="/">
				HOME
				</NavLink>
				<button
					className="navbar-toggler collapsed"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#mobileMenu"
					aria-controls="mobileMenu"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="toggler-icon top-bar"></span>
					<span className="toggler-icon middle-bar"></span>
					<span className="toggler-icon bottom-bar"></span>
				</button>
				
				<div className="collapse navbar-collapse" id="mobileMenu">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
						<b className="text-white">HOME</b>
					</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								activeClassName="active"
								to="/cruds"
							>
								HOME
							</NavLink>
						</li>
						
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
