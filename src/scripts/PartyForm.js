
import { sendRequest } from "./dataAccess.js"

//this function returns the html representation of the party form. It returns the text boxes 
//that the client will fill in. It has the submit request buttom html also.

export const partyForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="parentName">Parent Name</label>
            <input type="text" name="parentName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="childName">Child Name</label>
            <input type="text" name="childName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="numberAttending">Number of Children Attending</label>
            <input type="number" name="numberAttending" class="input" />
        </div>
        <div class="field">
            <label class="label" for="address">Party Address</label>
            <input type="text" name="address" class="input" />
        </div>
        <div class="field">
            <label class="label" for="date">Party Date</label>
            <input type="date" name="date" class="input" />
        </div>
        <div class="field">
        <label class="label" for="hours">Number of Hours</label>
        <input type="number" name="hours" class="input" />
    </div>
        <button class="button" id="submitRequest">Submit Request</button>
    `

    return html
}


//querySelector attaches JS to HTML element with id of "container"--which is the id in the <main> in index.html

const mainContainer = document.querySelector("#container")

//mainContainer is the whole document and now it has an event listener
mainContainer.addEventListener("click", clickEvent => {
    //if the the target.id of the thing clicked is "submitRequest", then continue with code
    //"submitRequest" is the id of <button> in this module
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        //.value is given by dom/browser as a property
       
        const userParentName = document.querySelector("input[name='parentName']").value
        const userChildName = document.querySelector("input[name='childName']").value
        const userNumberAttending = document.querySelector("input[name='numberAttending']").value
        const userAddress = document.querySelector("input[name='address']").value
        const userDate = document.querySelector("input[name='date']").value
        const userHours = document.querySelector("input[name='hours']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            parentName: userParentName,
            childName: userChildName,
            NumberAttending: userNumberAttending,
            address: userAddress,
            date: userDate,
            hours: userHours
        }



        // Send the data to the API for permanent storage
        //sendRequest is a function created in dataAccess.js
        sendRequest(dataToSendToAPI)
    }
})