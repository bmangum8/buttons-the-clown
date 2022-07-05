import { fetchClowns, fetchRequests } from "./dataAccess.js"
import { Buttons } from "./Buttons.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(() => fetchClowns())
        .then (
            () => {
            mainContainer.innerHTML = Buttons()
        }
    )
}

render()



mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

render()

