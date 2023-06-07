const http = require('http')

let requestsCount = 0

const server = http.createServer((request, response) => {
    // requestsCount++

    switch (request.url) {
        case '/students': 
            response.write('HERE SOME STUDENTS')
            break;
        
        case '/teachers': 
            response.write('Teachers of the project')
            break;

        default :     
        response.write('NOT FOUND')
        
    }
    response.end()
})

server.listen(3003)