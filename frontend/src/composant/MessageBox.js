import React from 'react'

export default function MessageBox(){
    return(
        <div className={`alert alert-${props.variant ||'info'}`}>
            {propos.children}
        </div>
    )
}