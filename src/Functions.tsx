import globalClasses from "./App.module.css";
export function Hint(id: string, message: string, action: "show" | "hide"){
    let element = document.getElementById(id) as HTMLElement;
    element.innerHTML = message;
    if(action === "show") {
        element.classList.remove(globalClasses.none);
    }else {
        element.classList.add(globalClasses.none)
    }
}