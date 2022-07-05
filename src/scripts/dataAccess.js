const applicationState = {
    requests: [],
    clowns: []
}


const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

//this function fetches clowns array from json doc. 
export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.clowns = data
            }
        )
}


export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
} //returns a copy of requests array


export const getClowns = () => {
    return applicationState.clowns.map(clown => ({...clown}))
} //reurns a copy of clowns array




export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
             //I added the line below to see if it would work. it does!
            const mainContainer = document.querySelector("#container")
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                //I added the line below to see if it would work. it does!
                const mainContainer = document.querySelector("#container")
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}




//This will perform the POST request to save the completion object to the API
export const saveCompletion = (completedObject) => {
    const saveOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedObject)
    }
    return fetch(`${API}/completions`, saveOptions)
    .then(response => response.json())
    .then(() => {
         //I added the line below to see if it would work. it does!
        const mainContainer = document.querySelector("#container")
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}




// This will retrieve all completion objects from the API
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.completions = data
            }
        )
}

