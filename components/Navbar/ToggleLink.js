import { useRouter } from "next/router";
import Link  from 'next/link';
import React from 'react';

export const ToggleLink = ({href, name}) => {

    const router = useRouter();
    const baseClass = "nav-link text-secondary" ;
    let activeClass = "";
    
    if(router.pathname === href){
        activeClass = "text-warning";
    }

    return <Link href={href}>
        <a className={`${baseClass} ${activeClass}`}>{name}</a>
    </Link>
}