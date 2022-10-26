import React, { useEffect, useState } from "react";
import NavbarHeader from "../components/NavbarHeader/NavbarHeader";
import ProjectContainer from "../components/ProjectContainer/ProjectContainer";
import Footer from "../components/Footer/Footer";
// import data from "../data/data"; // LOCAL SAMPLE DATA

export default function CurrentPage() {
    const [projects, setProjects] = useState();
    const myurl = 'https://ject-pro.herokuapp.com';

    useEffect(() => {
        // get data from BACKEND
        fetch(`${myurl}/current`, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }}
         )
         .then((response) => response.json())
         .then((actualData) => {
            console.log(actualData);
             setProjects(actualData);
         })
         .catch((err) => {
             console.log(err.message);
         });

       }, []);

    return (
        <div className="App">
            <NavbarHeader />
            <ProjectContainer projects={ projects } state='current' />
            <Footer />
        </div>
    );
}