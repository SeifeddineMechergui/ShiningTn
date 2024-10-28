const local = 'http://localhost:5000'
const production = 'https://shining-api.onrender.com'

let base_url=''
let mode='pro'

if(mode==='pro'){
    base_url=production
}else{
    base_url='https://shining-api.onrender.com'
}


export  {base_url}