/*
  A very basic app to demonstrate JSON Web Token being used in OpenIDConnect using Google as an account provider
  This is a command line app, run with "node app.js <id token>"
*/

import { decode, verify } from 'jsonwebtoken';
import jwkToPem from 'jwk-to-pem';
import fetch from 'node-fetch';

// The function to validate a JWT.  
//
// For teaching purposes, the function is completely async
// and throws no exceptions.  
//
// In a production system, you'll want manage it differently
// 
export default async function validateJwt(token) {

    // First need to find out which key id is being used, we can get this from the header
    let d = decode(token,{complete:true});
    let kid = d.header['kid'];

    // Retreive the public keys from google

    data = await fetch('https://www.googleapis.com/oauth2/v3/certs');
    certs = await data.json();

    // Find the correct key
    let key = certs.keys.filter( c => c.kid == kid );

    // we now need to convert the certificate to pem format
    let pem = jwkToPem(key[0]);

    // We use the PEM cert to verify the token is signed by google
    try {
	    let result = await verify(token, pem);
	        return result;
        } catch (e) {
	        return JSON.parse(`{ "${e.name}": "${e.message}"}`);
        }
}
