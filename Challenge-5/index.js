const { Collection, Item, Header } = require('postman-collection')
const fs = require('fs')

const postmanCollection = new Collection({
    info: {
        name: "Challenge 4 documentation"
    },
    item: []
})

// Add header
const rawHeaderString = 'Content-Type:application/json\ncache-control:no-cache\n'

const rawHeader = Header.parse(rawHeaderString)

const reqHeader = rawHeader.map(h => new Header(h))

const reqPayload = {
    username: 'username123',
    password: 'password123'
}

// Add test for request
const reqTest = `
pm.test('Sample test: Test for successfull response', function(){
    pm.expect(pm.response.code).to.equal(200)
})
`

// Create the final request
const postmanReq = new Item({
    name: 'register',
    request: {
        header: reqHeader,
        url: 'http://localhost:3000/auth/register',
        method: 'POST',
        body: {
            mode: 'raw',
            raw: JSON.stringify(reqPayload)
        },
        auth: null
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: reqTest
            }
        }
    ]
})

const postmanReq2 = new Item({
    name: 'login',
    request: {
        header: reqHeader,
        url: 'http://localhost:3000/auth/login',
        method: 'POST',
        body: {
            mode: 'raw',
            raw: JSON.stringify(reqPayload)
        },
        auth: null
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: reqTest
            }
        }
    ]
})

const postmanReq3 = new Item({
    name: 'whoami',
    request: {
        header: 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n',
        url: 'http://localhost:3000/auth/whoami',
        method: 'GET',
        auth: null
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: reqTest
            }
        }
    ]
})

const postmanReq4 = new Item({
    name: 'change-password',
    request: {
        header: 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n',
        url: 'http://localhost:3000/auth/change',
        method: 'POST',
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                username: 'username123',
                oldPassword: 'password123',
                newPassword: 'mypassword123',
                confirmNewPassword: 'mypassword123'
            })
        },
        auth: null
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: reqTest
            }
        }
    ]
})

const postmanReq5 = new Item({
    name: 'user-index',
    request: {
        header: reqHeader,
        url: 'http://localhost:3000/user/index',
        method: 'GET',
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: reqTest
            }
        }
    ]
})

const postmanReq6 = new Item({
    name: 'user-delete',
    request: {
        header: 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n',
        url: 'http://localhost:3000/user/delete',
        method: 'DELETE',
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                username: 'username123',
                password: 'password123'
            })
        },
        auth: null
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: reqTest
            }
        }
    ]
})

const postmanReq7 = new Item({
    name: 'user-bio-create',
    request: {
        header: reqHeader,
        url: 'http://localhost:3000/user-bio/create',
        method: 'POST',
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                account_name: 'kucing_gaming',
                account_level: 'gold'
            })
        },
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: reqTest
            }
        }
    ]
})

const postmanReq8 = new Item({
    name: 'user-bio-index',
    request: {
        header: reqHeader,
        url: 'http://localhost:3000/user-bio/index',
        method: 'GET'
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: reqTest
            }
        }
    ]
})

const postmanReq9 = new Item({
    name: 'user-bio-update',
    request: {
        header: reqHeader,
        url: 'http://localhost:3000/user-bio/update',
        method: 'PUT',
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                account_name: 'kucing_gaming',
                account_level: 'silver'
            })
        },
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: reqTest
            }
        }
    ]
})

const postmanReq10 = new Item({
    name: 'user-bio-delete',
    request: {
        header: reqHeader,
        url: 'http://localhost:3000/user-bio/delete',
        method: 'DELETE',
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                account_name: 'kucing_gaming',
                account_level: 'silver'
            })
        },
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: reqTest
            }
        }
    ]
})

const postmanReq11 = new Item({
    name: 'user-history-create',
    request: {
        header: reqHeader,
        url: 'http://localhost:3000/user-history/create',
        method: 'POST',
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                highest_tier: 'gold',
                highest_points: 3000
            })
        },
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: reqTest
            }
        }
    ]
})

const postmanReq12 = new Item({
    name: 'user-history-index',
    request: {
        header: reqHeader,
        url: 'http://localhost:3000/user-history/index',
        method: 'GET'
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: reqTest
            }
        }
    ]
})

const postmanReq13 = new Item({
    name: 'user-history-update',
    request: {
        header: reqHeader,
        url: 'http://localhost:3000/user-history/update',
        method: 'PUT',
        body: {
            mode: 'raw',
            raw: JSON.stringify({
                id: 1,
                highest_tier: 'gold',
                highest_points: 3000
            })
        },
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: reqTest
            }
        }
    ]
})

const postmanReq14 = new Item({
    name: 'user-history-delete',
    request: {
        header: reqHeader,
        url: 'http://localhost:3000/user-history/delete/1',
        method: 'DELETE'
    },
    events: [
        {
            listen: 'test',
            script: {
                type: 'text/javascript',
                exec: reqTest
            }
        }
    ]
})

let myItems = [postmanReq, postmanReq2, postmanReq3, postmanReq4, postmanReq5, postmanReq6, postmanReq7, postmanReq8, postmanReq9, postmanReq10, postmanReq11, postmanReq12, postmanReq13, postmanReq14]

for (let i = 0; i < myItems.length; i++) {
    postmanCollection.items.add(myItems[i])
}


// Convert to json
const collectionJSON = postmanCollection.toJSON()

// Export to file
fs.writeFile('./collection.json', JSON.stringify(collectionJSON), (err) => {
    if (err) console.log(err)
    console.log('file saved!')
})