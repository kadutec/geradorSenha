const inputEl = document.querySelector("#password")
const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numberCheckEl = document.querySelector("#number-check")
const symbolCheckEl = document.querySelector("#symbol-check")
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar")

let passwordLength = 10

function generatePassword() {
    let chars = "abcdefghijklmnopqrstuvwyz"

    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWYZ"
    const numberChars = "0123456789"
    const symbolChars = "!@#$%¨&*()[]_-+/<>"

    if (upperCaseCheckEl.checked) {
        chars += upperCaseChars
    }
    
    if (numberCheckEl.checked) {
        chars += numberChars
    }
    
    if (symbolCheckEl.checked) {
        chars += symbolChars
    }

    let password = ""

    for (let i = 0; i < passwordLength; i++){
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }

    inputEl.value = password
    calculateQuality()
}

function calculateQuality() {
    const percent = Math.round(
        (passwordLength / 18) * 100 * 0.25 +
            (upperCaseCheckEl.checked ? 15 : 0) + 
            (numberCheckEl.checked ? 25 : 0) +
            (symbolCheckEl.checked ? 35 : 0)
    )
    console.log(percent)

    securityIndicatorBarEl.style.width = `${percent}%`

    if(percent > 69) {
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.add("safe")
    }

    else if(percent > 45) {
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.add("warning")
        securityIndicatorBarEl.classList.remove("safe")
    }

    else {
        securityIndicatorBarEl.classList.add("critical")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.remove("safe")
    }

    if(percent >= 100) {
        securityIndicatorBarEl.classList.add("completed")
    }

    else {
        securityIndicatorBarEl.classList.remove("completed")
    }
}


function copy () {
    navigator.clipboard.writeText(inputEl.value)
}

const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener("input", function () {
    passwordLength = passwordLengthEl.value
        document.querySelector('#password-length-text').innerText = passwordLength
    generatePassword()
})
upperCaseCheckEl.addEventListener('click', generatePassword)
numberCheckEl.addEventListener('click', generatePassword)
symbolCheckEl.addEventListener('click', generatePassword)
renew.addEventListener('click', generatePassword)

document.querySelector("#copy1").addEventListener("click", copy)
document.querySelector("#copy2").addEventListener("click", copy)

generatePassword()