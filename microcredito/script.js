
// Atualizar valores dos sliders em tempo real
const loanSlider = document.querySelector('input[type="range"][min="1000"]');
const termSlider = document.querySelector('input[type="range"][min="1"]');
const loanValue = document.querySelector('.slider-value:nth-of-type(1)');
const termValue = document.querySelector('.slider-value:nth-of-type(2)');

loanSlider.addEventListener('input', function() {
    loanValue.textContent = '$' + this.value;
    calculatePayment();
});

termSlider.addEventListener('input', function() {
    termValue.textContent = this.value + ' Months';
    calculatePayment();
});

// Calcular pagamento mensal (exemplo simples)
function calculatePayment() {
    const loanAmount = parseInt(loanSlider.value);
    const termMonths = parseInt(termSlider.value);
    const interestRate = 0.15; // 15% anual
    const monthlyRate = interestRate / 12;
    
    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
    const totalPayment = monthlyPayment * termMonths;
    
    document.querySelector('.result-value:nth-of-type(1)').textContent = '$' + Math.round(monthlyPayment);
    document.querySelector('.result-value:nth-of-type(3)').textContent = '$' + Math.round(totalPayment);
}

// Calcular inicialmente
calculatePayment();
