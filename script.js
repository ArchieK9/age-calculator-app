"use strict";

// Get references to the HTML elements
let form = document.getElementById("myForm");
let y_input = document.getElementById("year");
let m_input = document.getElementById("month");
let d_input = document.getElementById("day");
let y_output = document.getElementById("y-out");
let m_output = document.getElementById("m-out");
let d_output = document.getElementById("d-out");
let btn = document.getElementById("btn");

// Attach an event listener to the form for the "submit" event
form.addEventListener("submit", handleSubmit);

// Get the current date
const date = new Date();
let day = date.getDate();
let month = 1 + date.getMonth();
let year = date.getFullYear();

// Define the number of days in each month
const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Function to validate the input values
function validate() {
    // Get all input elements
    const inputs = document.querySelectorAll("input");

    // Initialize the validator flag
    let validator = true;

    // Loop through each input element
    inputs.forEach((i) => {
        // Get the parent element of the input
        const parent = i.parentElement;
        // Convert the input value to an integer
        const inputValue = parseInt(i.value);

        // Check if the input value is not a number
        if (isNaN(inputValue)) {
            i.style.borderColor = "red";
            parent.querySelector("small").innerText = "Please enter a valid number.";
            validator = false;
        } else if (!i.value) {
            // Check if the input is empty
            i.style.borderColor = "red";
            parent.querySelector("small").innerText = "This field is required.";
            validator = false;
        } else if (i === m_input && (inputValue > 12 || inputValue < 1)) {
            // Check if the month input is outside the valid range
            i.style.borderColor = "red";
            parent.querySelector("small").innerText = "Must be a valid month.";
            validator = false;
        } else if (i === d_input && (inputValue > 31 || inputValue < 1)) {
            // Check if the day input is outside the valid range
            i.style.borderColor = "red";
            parent.querySelector("small").innerText = "Must be a valid day.";
            validator = false;
        } else {
            // Clear any previous validation error
            i.style.borderColor = "";
            parent.querySelector("small").innerText = "";
        }
    });

    // Return the validator flag
    return validator;
}

// Function to handle the form submission
function handleSubmit(e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Check if the input values are valid
    if (validate()) {
        // Adjust the date based on the input values
        if (parseInt(d_input.value) > day) {
            day = day + months[month - 1];
            month = month - 1;
        }
        if (parseInt(m_input.value) > month) {
            month = month + 12;
            year = year - 1;
        }

        // Calculate the age differences
        const d = day - parseInt(d_input.value);
        const m = month - parseInt(m_input.value);
        const y = year - parseInt(y_input.value);

        // Display the age differences in the output elements
        d_output.innerHTML = d;
        m_output.innerHTML = m;
        y_output.innerHTML = y;
    }
}
