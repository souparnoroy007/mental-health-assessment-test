// Questions with categories and weights
const questions = [
    { text: "Do you often feel sad or depressed?", category: "depression", weight: 2 },
    { text: "Do you have trouble finding joy in things you once enjoyed?", category: "depression", weight: 2 },
    { text: "Do you feel nervous or anxious often?", category: "anxiety", weight: 2 },
    { text: "Do you avoid social situations due to anxiety?", category: "anxiety", weight: 1 },
    { text: "Do you have difficulty sleeping or sleep too much?", category: "stress", weight: 1 },
    { text: "Do you feel tired or fatigued most of the time?", category: "stress", weight: 1 },
    { text: "Do you experience rapid heart rate or shortness of breath without physical activity?", category: "anxiety", weight: 2 },
    { text: "Do you feel hopeless about the future?", category: "depression", weight: 3 },
    { text: "Do you have trouble concentrating or making decisions?", category: "stress", weight: 1 },
    { text: "Do you feel overwhelmed by daily tasks?", category: "stress", weight: 1 },
    { text: "Do you have sudden mood swings?", category: "emotional instability", weight: 2 },
    { text: "Do you often feel irritable or frustrated?", category: "emotional instability", weight: 1 },
    { text: "Do you feel isolated or detached from people around you?", category: "depression", weight: 2 },
    { text: "Do you have thoughts of harming yourself?", category: "depression", weight: 5 },
    { text: "Do you find yourself worrying excessively about small issues?", category: "anxiety", weight: 1 },
    { text: "Do you feel like you have lost control over your life?", category: "stress", weight: 2 },
    { text: "Do you feel physically tense or restless?", category: "anxiety", weight: 1 },
    { text: "Do you often feel that things are out of your control?", category: "stress", weight: 2 },
    { text: "Do you struggle to communicate your feelings or thoughts with others?", category: "emotional instability", weight: 1 },
    { text: "Do you feel like you have no one to turn to for support?", category: "depression", weight: 2 }
];

let responses = [];
let categoryScores = {
    depression: 0,
    anxiety: 0,
    stress: 0,
    "emotional instability": 0
};
let currentQuestionIndex = 0;

// Display the first question
function showQuestion() {
    document.getElementById("question").innerText = questions[currentQuestionIndex].text;
}

// Handle the user answer (Yes or No)
function answerQuestion(answer) {
    const currentCategory = questions[currentQuestionIndex].category;
    const currentWeight = questions[currentQuestionIndex].weight;
    if (answer === "yes") {
        categoryScores[currentCategory] += currentWeight;
    }
    responses.push(answer);

    // Display the user's response in the chat
    const userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.innerText = answer === "yes" ? "Yes" : "No";
    document.getElementById("chat-box").appendChild(userMessage);

    // Move to the next question or display the result
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        analyzeResponses();
    }
}

// Analyze the responses to determine the mental health assessment
function analyzeResponses() {
    // Determine the category with the highest score
    const maxCategory = Object.entries(categoryScores).reduce((max, current) =>
        current[1] > max[1] ? current : max
    )[0];

    const totalScore = Object.values(categoryScores).reduce((a, b) => a + b, 0);
    const maxScore = questions.reduce((sum, q) => sum + q.weight, 0);
    const distressPercentage = ((totalScore / maxScore) * 100).toFixed(1);

    // Remedies based on the most critical category
    const remedies = {
        depression: "Engage in therapy sessions, connect with loved ones, and practice journaling your thoughts. Avoid isolating yourself.",
        anxiety: "Try mindfulness exercises, deep breathing, and yoga. Limit caffeine and consider cognitive-behavioral therapy.",
        stress: "Prioritize tasks, set boundaries for work, and engage in hobbies or physical activity. Avoid overcommitting yourself.",
        "emotional instability": "Practice emotional regulation techniques like journaling or art therapy. Focus on understanding triggers and responses."
    };

    // Crisis intervention
    const crisisMessage =
        maxCategory === "depression" && categoryScores.depression >= 7
            ? "Immediate help is recommended. Reach out to a crisis helpline or seek urgent professional care."
            : "";

    // Hide the question container
    document.getElementById("question-container").style.display = "none";

    // Distress level color
    const distressColor = distressPercentage >= 50 ? "red" : "#32CD32"; // Bright green for < 50%

    // Display results and personalized suggestion
    document.getElementById("result").innerHTML = `
        Your mental health assessment result:<br>
        Distress Level: <span style="color: ${distressColor}; font-weight: bold;">${distressPercentage}%</span><br>
        Most Affected Area: <strong>${maxCategory}</strong><br>
        ${crisisMessage}
    `;
    document.getElementById("suggestion").innerHTML = `
        Suggested Remedy:<br>${remedies[maxCategory]}<br><br>
        <strong>Helpful Resources:</strong><br>
        <ul>
            <li><a href="https://www.mentalhealth.gov/" target="_blank">Mental Health Support</a></li>
            <li><a href="https://www.nimh.nih.gov/" target="_blank">NIMH Resources</a></li>
        </ul>
        <br>Remember, you are not alone, and help is always available.
    `;
}

// Start the chatbot when the page loads
window.onload = function () {
    showQuestion();
};
