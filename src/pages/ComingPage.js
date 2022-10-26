import React, { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import NavbarHeader from "../components/NavbarHeader/NavbarHeader";
import ProjectContainer from "../components/ProjectContainer/ProjectContainer";
// import data from "../data/data"; // SAMPLE DATA

export default function ComingPage() {

    const [projects, setProjects] = useState();
    const myurl = 'https://ject-pro.herokuapp.com';


    useEffect(() => {
        // get data from BACKEND
        fetch(`${myurl}/coming`, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }}
         )
         .then((response) => response.json())
         .then((actualData) => {
             setProjects(actualData);
         })
         .catch((err) => {
             console.log(err.message);
         });

    }, []);

    return (
        <div className="App">
            <NavbarHeader />
            <ProjectContainer projects={ projects } state='coming' />
            <Footer />
        </div>
    );
}