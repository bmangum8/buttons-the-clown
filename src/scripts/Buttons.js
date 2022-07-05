import { Requests } from "./Requests.js"
import { partyForm } from "./PartyForm.js"


//This function returns the HTML representation of the party request form and the list of requests at the bottom of the page
export const Buttons = () => {
    return `
        <h1>Buttons and Lollipop</h1>
        <section class="partyForm">
            ${partyForm()}
        </section>

        <section class="partyRequests">
            <h2>Party Requests</h2>
            ${Requests()}
        </section>
    `
}
