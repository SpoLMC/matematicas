document.addEventListener('DOMContentLoaded', function () {
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const scoreElement = document.getElementById('score');
  let score = 0;

  function generateQuestion() {
    let num1, num2, operator, correctAnswer;

    do {
      num1 = Math.floor(Math.random() * 10);
      num2 = Math.floor(Math.random() * 10);
      operator = getRandomOperator();
      correctAnswer = calculateAnswer(num1, num2, operator);
    } while (isNaN(correctAnswer) || correctAnswer < 0);

    const questionText = createQuestionText(num1, num2, operator);
    questionElement.textContent = questionText;
    generateOptions(correctAnswer);
  }

  function getRandomOperator() {
    const operators = ['+', '-'];
    const randomIndex = Math.floor(Math.random() * operators.length);
    return operators[randomIndex];
  }

  function calculateAnswer(num1, num2, operator) {
    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      default:
        return NaN;
    }
  }

  function createQuestionText(num1, num2, operator) {
    const num1Text = getRandomWithPossibilityOfVariable(num1);
    const num2Text = getRandomWithPossibilityOfVariable(num2);

    return `${num1Text} ${operator} ${num2Text} = `;
  }

  function getRandomWithPossibilityOfVariable(number) {
    const useVariable = Math.random() < 0.5;
    return useVariable ? 'x' : number;
  }

  function generateOptions(correctAnswer) {
    optionsElement.innerHTML = '';
    const incorrectAnswer1 = generateIncorrectAnswer(correctAnswer);
    const incorrectAnswer2 = generateIncorrectAnswer(correctAnswer);

    const options = [correctAnswer, incorrectAnswer1, incorrectAnswer2];
    options.sort(() => Math.random() - 0.5);

    options.forEach((option) => {
      const optionElement = document.createElement('button');
      optionElement.classList.add('option');
      optionElement.textContent = option;
      optionElement.addEventListener('click', () => checkAnswer(option, correctAnswer));
      optionsElement.appendChild(optionElement);
    });
  }

  function generateIncorrectAnswer(correctAnswer) {
    let incorrectAnswer;
    do {
      incorrectAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
    } while (isNaN(incorrectAnswer) || incorrectAnswer < 0);
    return incorrectAnswer;
  }

  function checkAnswer(selectedAnswer, correctAnswer) {
    optionsElement.childNodes.forEach((optionElement) => {
      const optionValue = parseFloat(optionElement.textContent);
      if (optionValue === correctAnswer) {
        optionElement.style.backgroundColor = 'green';
      } else {
        optionElement.style.backgroundColor = 'red';
      }
    });

    if (parseFloat(selectedAnswer) === correctAnswer) {
      alert('¡Correcto!');
      score++;
    } else {
      alert('Incorrecto. Se reinicia el puntaje.');
      score = 0;
    }

    updateScore();
    setTimeout(() => {
      optionsElement.childNodes.forEach((optionElement) => {
        optionElement.style.backgroundColor = '';
      });
      generateQuestion();
    }, 1000);
  }

  function updateScore() {
    if (scoreElement) {
      scoreElement.textContent = `Puntaje: ${score}`;
    }
  }

  // Llama a generateQuestion() para iniciar el juego.
  generateQuestion();
});
