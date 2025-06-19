import './App.css';

export default function WriteMessage() {
    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);


        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        // Save the name to sessionStorage
        if (formJson.chatterName && formJson.chatterName !== "Anonymous") {
            sessionStorage.setItem("chatterName", formJson.chatterName);
        }
        console.log(formJson);
    }

    function getValueFromSession() {
        // checks if there is a participant name in the session storage,
        // if there is, return the participant name
        // if there isn't, return an "Anonymous"
        if (!sessionStorage.getItem("chatterName")) {
            return "Anonymous";
        }
        return sessionStorage.getItem("chatterName");
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <label>
                Name: <input name="chatterName" defaultValue={getValueFromSession()}/>
            </label>
            <label>
                Write message >
                <textarea
                    name="messageContent"
                    rows={4}
                    cols={40}
                />
            </label>
            <hr/>
            <button type="submit">Send</button>
        </form>
    );
}