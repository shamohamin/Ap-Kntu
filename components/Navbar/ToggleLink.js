import { useRouter } from "next/router";
import Link  from 'next/link';
import React from 'react';

export const ToggleLink = ({href, name}) => {

    const router = useRouter();
    const baseClass = "nav-link" ;
    const diableClass = "text-secondary";
    let activeClass = "text-warning";
    
    const makeClass = () => 
        router.pathname === href ? `${baseClass} ${activeClass}` : `${baseClass} ${diableClass}`

    return <div>
        <Link href={href}>
            <a className={makeClass()}>{name}</a>
        </Link>
    </div>
    
}