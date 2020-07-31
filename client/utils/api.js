import * as fetch from 'isomorphic-fetch';

export let AccessToken = localStorage.getItem('token') || null;
export let User = {
    userid: localStorage.getItem('userid') || null,
    role: localStorage.getItem('role') || null
};

export const json = async (uri,method = 'GET', body) => {

    let headers = {
        'Content-type': 'application/json'
    };

    if(AccessToken) {
        headers['Authorization'] = `Bearer ${AccessToken}`;
    }

    try {
        let result = await fetch(url, {
            method,
            headers,
            body: JSON.stringify(body)
        });
        if(result.ok) {
            return (await result.json());
        } else {
            return false;
        }
    } catch(e) {
        console.log(e);
        throw e;
    }
};

export const SetAccessToken = (token,user = {userid: undefined, role: 'guest'}) => {
    AccessToken = token;
    User = user;

    localStorage.setItem('token',token);
    localStorage.setItem('userid', User.userid);
    localStorage.setItem('role', User.role);
}

export const isLoggedIn = () => {
    if (AccessToken)
    {
        return true;
    }
    else
    {
        return false;
    }
}

