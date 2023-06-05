import React from 'react'
import './Header.css'


export default props => 

<header className="header d-none d-sm-flex flex-column">

    <h1 className="mt-3">
        <i className={`fa fa-${props.icon} `} ></i> {props.title}
    </h1>
    <p className="lead text-muted">{props.subtitle} </p>
</header>



// d-none para a header não aparecer 

// d-sm-flex display flex para celular e dispositivos 