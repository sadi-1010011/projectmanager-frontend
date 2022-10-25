import React from "react";
import { useRouteError } from "react-router-dom";

export default function NoPage() {

    const error = useRouteError();
    console.error(error);

    return (
        <div className="row p-5 text-center">
            <h1>page not found 404!</h1>
            <a href="/"><button>home</button></a>
            <br/>
            <br/>
            <br/>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}