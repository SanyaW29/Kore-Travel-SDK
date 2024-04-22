let isLoginInProgress = false;
function login() {
    isLoginInProgress = true
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    const Logbtn = document.getElementById('login-section');

    const style1 = {
        display: "none"
    };

    Object.assign(Logbtn.style, style1);

    const Logname = document.getElementById('login-section-name');

    const style2 = {
        display: "block ",
    };

    Object.assign(Logname.style, style2);
    document.getElementById("login-section-name").innerHTML = "Hello, " + username + "."

    const apiUrl = 'https://demodpd.kore.ai/se-demo-logincred';
    const requestData = {
        UserName: username,
        Password: password,
        Token: UserToken
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Process the data from the API response
            console.log(data);
        })
        .catch(error => {
            isLoginInProgress = false
            console.error('Error fetching data:', error);
        });
}


function makeApiCall() {
    if (isLoginInProgress) {
        console.log("Login is in progress. Skipping API call.");
        return;
    } else {
        console.log("token checker running")
        const apiUrl = 'https://demodpd.kore.ai/se-demo-logincred';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const matchingItem = data.find(item => item.Token === UserToken);
                if (matchingItem) {
                    const Logbtn = document.getElementById('login-section');

                    const style1 = {
                        display: "none"
                    };

                    Object.assign(Logbtn.style, style1);

                    const Logname = document.getElementById('login-section-name');

                    const style2 = {
                        display: "block ",
                    };

                    Object.assign(Logname.style, style2);
                    document.getElementById("login-section-name").innerHTML = "Hello, " + matchingItem.UserName + "."
                    deleteApiCall(matchingItem.id)
                } else {
                    console.log('Token not found in the response. Continuing...');
                    setTimeout(makeApiCall, 1000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setTimeout(makeApiCall, 1000);
            });
    }
}
makeApiCall()
function deleteApiCall(id) {
    const apiUrl = 'https://demodpd.kore.ai/se-demo-logincred' + "/" + id;
    console.log(apiUrl)
    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
}


var triggerButton
var popupBox
function toggleAndClosePopup(event) {
    triggerButton = document.getElementById("menutrigger");
    popupBox = document.getElementById("boxcontent");
    if (event.target === triggerButton) {
        // Clicked on the trigger button, toggle the popup
        popupBox.style.display = (popupBox.style.display === "block") ? "none" : "block";
    } else if (!popupBox.contains(event.target)) {
        // Clicked outside the popup, close it
        popupBox.style.display = "none";
    }
}
document.addEventListener("click", toggleAndClosePopup);


function PageSwitch() {
    var username = document.getElementById("Musername").value;
    var password = document.getElementById("Mpassword").value;


    if (username === "john" && password === "123" || username=== "Kevin" && password==="123" ) {
        const Logbtn = document.getElementById('MainPage');
        const style1 = {
            display: "block"
        };
        Object.assign(Logbtn.style, style1);

        const Logbtn2 = document.getElementById('LoginPage');
        const style2 = {
            display: "none"
        };
        Object.assign(Logbtn2.style, style2);

        const koreChatWindow = document.querySelector('.kore-chat-window.minimize');
        const style = {
            opacity:"100%",
            pointerEvents:"auto"
        };
        Object.assign(koreChatWindow.style, style);

    } else {
        document.getElementById("warning").innerHTML = "Please enter a valid username and password."
        const Logbtn = document.getElementById('warning');
        const style1 = {
            display: "block"
        };
        Object.assign(Logbtn.style, style1);
    }
}