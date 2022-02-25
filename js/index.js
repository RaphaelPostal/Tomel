let row_active = 0;
let square_active = 1;
let alphabet =
document.onkeydown = function (e) {

    if (square_active <= 5 && (/[a-zA-Z]/).test(e.key) && e.key.length <= 1 && e.key !== 'Enter') {
        let square = document.querySelector(`#row-${row_active} :nth-child(${square_active})`);

        square.innerHTML += `<span class="letter">${e.key}</span>`;

        square_active ++;
    }

    console.log(square_active)

    if (e.key === 'Backspace' && square_active > 1) {
        square_active --;
        let square = document.querySelector(`#row-${row_active} :nth-child(${square_active})`);
        square.innerHTML = '';
        console.log(square_active)
    }

};