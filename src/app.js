const express = require('express');
const csvRoute = require('./routes/generateCsvRoute');


const app = express();
app.use("/api", csvRoute)

app.get('/test', function(req, res) {
    res.json({success: true})
})


const port = 9000;
app.listen(port, () => {
    console.log('listening on port ' , port);
})