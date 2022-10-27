import React from "react";
import './Footer.css';
import fbIcon from '../../img/facebook.png';
import instaIcon from '../../img/instagram.png';


export default function Footer() {
    return (
<footer className="footer-wrapper">
	<div className="container">
		<div className="row p-3">
			<div className="col-6 text-center text-white">
				<span className="">copyright @ 2022</span>
			</div>
			<div className="col-6 text-center">
				<span className="socialmedia-icon">
					<img src={fbIcon} alt="@fb" />
				</span>
				<span className="socialmedia-icon">
					<img src={instaIcon} alt="@insta" />
				</span>
			</div>
		</div>
	</div>
</footer>
    );
}