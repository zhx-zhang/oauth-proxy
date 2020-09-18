const PORT = process.env['PORT'] || 8000;
const restify = require('restify')
const errors = require('restify-errors')
const plugins = require('restify').plugins
const appendQuery = require('append-query')

const server = restify.createServer()
server.use(plugins.queryParser())

server.get('/', (req,res,next) => {

    // collect the query variables  
    // and store in JSON format 
    var props = {}
    
    for (var prop in req.query) {
        if (req.query.hasOwnProperty(prop)) {
            props[prop] = req.query[prop]
        }
    }

    let url_scheme = 'shortcuts%3A%2F%2Frun-shortcut%3Fname%3DAuth%26input%3D'

    // 
    console.log('props', props)

    // append the data to the url_scheme
    // default is JSON format
    url_scheme += `${encodeURI(JSON.stringify(props))}`

    // redirect
    console.log('url_scheme, final', url_scheme)
    res.redirect(url_scheme, next)

})

server.listen(PORT, () => {
    console.log('%s listening at %s', server.name, server.url)
})

// scriptable test: http://localhost:10001/?arg_format=qs&forward_to=scriptable%3A%2F%2F%2Frun%3FscriptName%3DTest%2520Auth&data1=value1&data2=value2
// shortcuts test:  http://localhost:10001/?arg_format=json&forward_to=shortcuts%3A%2F%2Frun-shortcut%3Fname%3DTest%2520Auth%26input%3D&data1=value1&data2=value2
