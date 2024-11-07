import {serve} from 'bun'
import { STATUS_CODES } from 'http';

serve({
    fetch(request){
        const url = new URL(request.url);
        if(url.pathname === '/'){
            return new Response("hello to the HOME page of the Bun Server",
                {status : 200},
                {headers: { 'Content-Type' : 'text/html'}}
            );
        } else if(url.pathname === '/about'){
            return new Response("hello to the ABOUT page of the Bun Server" ,
                 {headers: { 'Content-Type': 'text/plain' }},
                 {status : 200}
                );
        } else if(url.pathname === '/contact'){
            return new Response("hello to the CONTACT page of the Bun Server",
                {status : 200},
                {headers: { 'Content-Type' : 'text/html'}}
            );
        } else {
            return new Response("hello to the default page of the Bun Server",
                {status : 200},
                {headers: { 'Content-Type' : 'text/html'}}
            );
        }
    },
    port : 3000,
    hostname : '127.0.0.1'
})