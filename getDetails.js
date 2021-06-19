const {google} = require('googleapis');


const listEmails = async (auth, response) => {
    const gmail = google.gmail({version: 'v1', auth});
    try {
        const res = await gmail.users.messages.list({ userId: 'me'});
        const ids = res.data.messages.map(msg => ({id: msg.id}));
        console.log(ids)
        
        response.json(ids);
    } 
    catch (err) {
       console.log('The API returned an error: ' + err);  
       response.send(err);
    }  
}
  
const getEmail = async (auth, id, response) => {
    const gmail = google.gmail({version: 'v1', auth});
    try {
        const res = await gmail.users.messages.get({ id, userId: 'me' });
        const snippet = res.data.snippet 
        const subjectHeader = res.data.payload.headers.find(x=> x.name==="Subject")
        const data = {
            header: subjectHeader.value,
            bodyContentSnippet: snippet
        }
        console.log(data);
        response.json(data);
    } 
    catch (err) {
       console.log('The API returned an error: ' + err);  
       response.send(err);
    }  
}

module.exports = { listEmails, getEmail };