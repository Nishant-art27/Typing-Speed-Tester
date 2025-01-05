const sampleTexts = [
    "Typing speed tests are fun and a great way to improve typing accuracy.You have to practice typing every day and watch your skills grow over time.",
    "Coding can be both challenging and rewarding for anyone who tries.",
    "Diwali is my favourite festival. It is the festival of lights; it is celebrated in all parts of our country. A few days before Diwali, people clean their houses and shops and get them whitewashed."
  ];
  
  const sampleTextElement = document.getElementById("sample-text");
  const userInput = document.getElementById("user-input");
  const timeLeftElement = document.getElementById("time-left");
  const errorCountElement = document.getElementById("error-count");
  const wpmElement = document.getElementById("wpm");
  const startButton = document.getElementById("start-button");
  
  let timer;
  let timeLeft = 30;
  let errorCount = 0;
  let totalTyped = 0;
  let currentSampleText = "";
  
  startButton.addEventListener("click", startTest);
  
  function startTest() {
    resetValues();
    currentSampleText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    sampleTextElement.textContent = currentSampleText;
    userInput.disabled = false;
    userInput.focus();
    timer = setInterval(updateTimer, 1000);
    userInput.addEventListener("input", checkInput);
  }
  
  function resetValues() {
    clearInterval(timer);
    timeLeft = 30;
    errorCount = 0;
    totalTyped = 0;
    timeLeftElement.textContent = timeLeft;
    errorCountElement.textContent = errorCount;
    wpmElement.textContent = 0;
    userInput.value = "";
    sampleTextElement.textContent = "";
    userInput.disabled = true;
  }
  
  function updateTimer() {
    if (timeLeft > 0) {
      timeLeft--;
      timeLeftElement.textContent = timeLeft;
    } else {
      clearInterval(timer);
      userInput.disabled = true;
      calculateWPM();
    }
  }
  
  function checkInput() {
    const inputText = userInput.value;
    totalTyped++;
  
    if (inputText === currentSampleText) {
      clearInterval(timer);
      calculateWPM();
      userInput.disabled = true;
    } else {
      const isCorrect = currentSampleText.startsWith(inputText);
      if (!isCorrect) {
        errorCount++;
        errorCountElement.textContent = errorCount;
      }
    }
  }
  
  function calculateWPM() {
    const wordsTyped = totalTyped / 5;
    const wpm = Math.round(wordsTyped / (30 / 60));
    wpmElement.textContent = wpm;
  }