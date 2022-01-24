onload = () => {
    document.querySelector('#btn0').onclick = () => digito(0);
    document.querySelector('#btn1').onclick = () => digito(1);
    document.querySelector('#btn2').onclick = () => digito(2);
    document.querySelector('#btn3').onclick = () => digito(3);
    document.querySelector('#btn4').onclick = () => digito(4);
    document.querySelector('#btn5').onclick = () => digito(5);
    document.querySelector('#btn6').onclick = () => digito(6);
    document.querySelector('#btn7').onclick = () => digito(7);
    document.querySelector('#btn8').onclick = () => digito(8);
    document.querySelector('#btn9').onclick = () => digito(9);
    document.querySelector('#btnVirgula').onclick = virgula;
    document.querySelector('#btnClear').onclick = limpa;
    document.querySelector('#btnDivisao').onclick = () => operador('/');
    document.querySelector('#btnMultiplicacao').onclick = () => operador('*');
    document.querySelector('#btnSubtracao').onclick = () => operador('-');
    document.querySelector('#btnAdicao').onclick = () => operador('+');
    document.querySelector('#btnIgual').onclick = calcula;
}

// Variáveis para armazenar o que é exibido na calculadora e seu estado
let valorExibido = '0'; // Valor que será apresentado no display
let novoNumero = true; // Indica se o próximo digito será de novo número
let valorAnterior = 0; // Valor acumulado para uma operação
let operacaoPendente = null; // Operação acumulada

// Atualiza o display
const atualizaDisplay = () => {
    let [parteInteira, parteDecimal] = valorExibido.split(',');
    if (parteInteira.length > 12) {
        document.querySelector('#display').innerText = 'Erro';
        return;
    }
    let v = '';
    c = 0;
    for(let i = parteInteira.length - 1; i >= 0; i--) {
        if(++c > 3) {
            v= '.' + v;
            c = 1;
        }
        v = parteInteira[i] + v;
    }
    v= v + (parteDecimal ? ',' + parteDecimal.substr(0, 12 - v.length) : '');
    document.querySelector('#display').innerText = v;
}

// Tratamento do clique nos botões de dígito
const digito = (n) => {
    if(novoNumero) {
        valorExibido = ''+n;
        novoNumero = false;
    }else if (valorExibido.length < 13) valorExibido += n;
    atualizaDisplay();
}

// Tratamento do clique na vírgula
const virgula = () => {
    if(novoNumero) {
        valorExibido = '0,';
        novoNumero = false;
    } else if (valorExibido.indexOf(',') == -1) valorExibido += ',';
    atualizaDisplay();
}

// Tratamento do clique no botão C (Clear)
const limpa = () => {
    novoNumero = true;
    valorAnterior = 0;
    valorExibido = '0';
    operacaoPendente = null;
    atualizaDisplay();
}

//Converte a string do valor para um número real
const valorAtual = () => parseFloat(valorExibido.replace(',', '.'));

//Tratamento do clique nos botões de operadores
const operador = (op) => {
    calcula();
    valorAnterior = valorAtual();
    operacaoPendente = op;
    novoNumero = true;
    // Acumula nova operação
}

const calcula = () => {
    if(operacaoPendente != null) {
        let resultado;
        switch(operacaoPendente) {
            case '+': resultado = valorAnterior + valorAtual(); break;
            case '-': resultado = valorAnterior - valorAtual(); break;
            case '*': resultado = valorAnterior * valorAtual(); break;
            case '/': resultado = valorAnterior / valorAtual(); break;
        }
        valorExibido = resultado.toString().replace('.', ',');
    }
    novoNumero = true;
    operacaoPendente = null;
    valorAnterior = 0;
    atualizaDisplay();
}