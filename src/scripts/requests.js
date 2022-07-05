
import { getRequests, getClowns, deleteRequest, saveCompletion } from "./dataAccess.js"

/*
In the following code, you will need to define the function that will be passed to the map() method.

The function you write will convert each service request object into HTML representations. 
Since it is wrapped with a <ul> element, make each one an <li> element showing only the description of the request to start.

The function should define 1 parameter (value will be each object in the array)
The description of the service request should be interpolated inside the <li> HTML representation.
The function should return the HTML representation.
For example, if you write a function named convertRequestToListElement, then you would update the code below to the following...

requests.map(convertRequestToListElement).join("")
*/


//This function returns the html representation of of each party request object
export const Requests = () => {
    const requests = getRequests() //getRequests() returns a copy of the requests array

    let html = `
        <ul>
            ${
                requests.sort(
                    (a, b) => {
                        return new Date(b.date) - new Date(a.date) 
                    }
                ).map(convertRequestToListElement).join("")

            }
        </ul>
    `

    return html
}


/*
example of list by date:
const activities = [
  { title: 'Hiking', date: new Date('2019-06-28') },
  { title: 'Shopping', date: new Date('2019-06-10') },
  { title: 'Trekking', date: new Date('2019-06-22') }
]
You want to sort those activities by the date property.

You can use the sort() method of Array, which takes a callback function,
 which takes as parameters 2 objects contained in the array (which we call a and b):

const sortedActivities = activities.sort((a, b) => b.date - a.date)
When we return a positive value, the function communicates to sort() 
that the object b takes precedence in sorting over the object a. 
Returning a negative value will do the opposite.

The sort() method returns a new sorted array, but it also sorts the original array in place. 
Thus, both the sortedActivities and activities arrays are now sorted. 
One option to protect the original array from being modified is to use the slice() method 
to create a copy of the array prior to sorting, as follows:

const sortedActivities = activities.slice().sort((a, b) => b.date - a.date)
*/






//this function returns the html respresentation of delete button and the drop down menu of clown names
const convertRequestToListElement = (request) => {
    const clowns = getClowns()
   
    return `<li>
        ${request.parentName} requested a party for ${request.childName} on ${request.date}
        <button class="request__delete" 
        id="request--${request.id}">
    Delete
</button>
<select class="clowns" id="clowns">
    <option value="">Choose</option>
    ${
        clowns.map(
            clown => {
                return `<option value="${request.id}--${clown.id}">${clown.name}</option>`
            }
        ).join("")
    }
</select>
</li>`
}



const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})



//adds an event listener and invokes the saveCompletion function that saves request object to api
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns") {
            const [requestId, clownId] = event.target.value.split("--")

                   const completion = {
                    requestId: parseInt(requestId),
                    clownId: parseInt(clownId),
                    date_created: Date.now()
                }
             
            saveCompletion(completion)
        }
        
    }
)


