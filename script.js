async function signup() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    });

    alert("Signup successful");
}

async function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, password })
    });

    let data = await res.json();

    if (data.success) {
        localStorage.setItem("user", username);
        window.location.href = "index.html";
    } else {
        alert("Wrong login");
    }
}

function appendValue(val) {
    document.getElementById("display").value += val;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function deleteLast() {
    let val = document.getElementById("display").value;
    document.getElementById("display").value = val.slice(0, -1);
}

async function calculate() {
    let expression = document.getElementById("display").value;
    let result;

    try {
        result = eval(expression);
    } catch {
        result = "Error";
    }

    document.getElementById("display").value = result;

    let username = localStorage.getItem("user");

    await fetch("http://localhost:3000/save", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, expression, result })
    });

    loadHistory();
}

async function loadHistory() {
    let username = localStorage.getItem("user");

    let res = await fetch(`http://localhost:3000/history/${username}`);
    let data = await res.json();

    let historyDiv = document.getElementById("history");
    historyDiv.innerHTML = "";

    data.forEach(item => {
        historyDiv.innerHTML += `<p>${item.expression} = ${item.result}</p>`;
    });
}