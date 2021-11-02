$(document).ready(function(){
    console.log('[EXEMPLO] Flappy Bird');

    const comandos = new Map();

    comandos.set('left', 'left');
    comandos.set('right', 'right');
    comandos.set('step', new RegExp('step [- +]?[0-9]+', 'g'));

    let comands = {validComands: [], invalidComands: []};
    let running = false;

    const canvas = document.querySelector('#game-canvas');
    const contexto = canvas.getContext('2d');
    let sapoAlquimistaDirection = 0;
    let sapoSpriteIndex = 0;
    let stepCount = 1;

    // canvas.height = screen.availHeight;

    /**SAPO ALQUIMISTA*/
    const cenario = new Image();
    cenario.src = 'cenarioJogo.png';

    const sapo = new Image();
    sapo.src = 'spriteSapoAlquimista.png';

    const fundo = {
        spriteX: 0, //inicio da imagem
        spriteY: 0, //inicio da imagem
        largura: 1280,
        altura: 851,
        x: 0,
        y: 0,
        desenha() {
            contexto.drawImage(
                cenario,
                fundo.spriteX, fundo.spriteY,
                fundo.largura, fundo.altura,
                fundo.x, fundo.y,
                fundo.largura, fundo.altura,
            );
        },
    };

    const sapoAlquimista = {
        spriteX: 0,
        spriteY: 0,
        largura: 399.25,
        altura: 640,
        x: (1280 - 399.25) / 2,
        y: 120,
        desenha() {
            executeComands();
            contexto.save();
            let tamanhoNaTelaX = sapoAlquimista.largura * .3;
            let tamanhoNaTelaY = sapoAlquimista.altura * .3;
            contexto.translate(sapoAlquimista.x + (sapoAlquimista.largura / 2), sapoAlquimista.y + (sapoAlquimista.altura / 2));
            contexto.rotate(sapoAlquimistaDirection * Math.PI / 180);
            contexto.drawImage(
                sapo,
                sapoAlquimista.spriteX, sapoAlquimista.spriteY, // Sprite X, Sprite Y
                sapoAlquimista.largura, sapoAlquimista.altura, // Tamanho do recorte na sprite
                -tamanhoNaTelaX / 2, -tamanhoNaTelaY / 2,
                tamanhoNaTelaX, tamanhoNaTelaY
            );
            contexto.restore();
        }
    }
    /**FIM SAPO ALQUIMISTA*/

    function getComands(lines = []) {

        let validComands = [];
        let invalidComands = [];

        for(let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();

            if(line.startsWith('step')) {
                while(line.includes('  '))
                    line = line.replaceAll('  ', ' ');
                if(line.match(comandos.get('step'))) {
                    validComands.push(line);
                }
                continue;
            }
            if(!line.includes(' ')) {
                validComands.push(comandos.get(line));
            }
            if(i+1 > validComands.length) {
                invalidComands.push(line);
                break;
            }
        }
        return {
         invalidComands: invalidComands,
         validComands: validComands
        }
    }

    function executeComands() {
        while (comands.validComands.length > 0) {
            let comand = comands.validComands[0];
            if(comand.startsWith('step')) {
                let step = Number(comand.split(' ')[1]);
                if(step !== 0)
                {
                    sapoSpriteIndex = parseInt(stepCount / 4) % 4;
                    sapoAlquimista.spriteX = 399.25 * sapoSpriteIndex;
                    stepCount++;
                    // para direita ou esquerda
                    if(sapoAlquimistaDirection === 90 || sapoAlquimistaDirection === 270) {
                        sapoAlquimista.x = sapoAlquimista.x + (step < 0 ? -10 : 10); //cada step são 10px
                    }
                    //para baixo ou para cima
                    else if(sapoAlquimistaDirection === 0 || sapoAlquimistaDirection === 180) {
                        sapoAlquimista.y = sapoAlquimista.y + (step < 0 ? -10 : 10); //cada step são 10px
                    }
                    step = step < 0 ? step + 1 : step - 1;
                    comands.validComands[0] = 'step ' + step;
                    break;
                }
                else {
                    sapoAlquimista.spriteX = 0;
                    comands.validComands.splice(0, 1);
                }
            }
            else {
                if(comand === 'right') {
                    sapoAlquimistaDirection += 90
                    if(sapoAlquimistaDirection >= 360) {
                        sapoAlquimistaDirection -= 360;
                    }
                }
                else if(comand === 'left') {
                    sapoAlquimistaDirection -= 90
                    if(sapoAlquimistaDirection < 0) {
                        sapoAlquimistaDirection += 360;
                    }
                }
                comands.validComands.splice(0, 1);
            }
            if(comands.validComands.length === 0) {
                // alert('Todos os comandos foram executados');
                // Object.assign(flappyBird, flappyBirdAux);
                // loop(false);
            }
        }
    }

    function loop(repetir = true) {
        fundo.desenha();
        sapoAlquimista.desenha();

        if(repetir) {
            setTimeout(() => {
                requestAnimationFrame(loop);
            }, 1000/35)
        }
    }

    loop(false);

    $("#play").click(function(){
        comands = $('#code')[0].value.length > 0 ? getComands($('#code')[0].value.split('\n')) : comands;
        if(!running && !comands.invalidComands.length && comands.validComands.length) {
            running = true;
            loop();
        }
    });

    $("#code").on("input", function() {
        linhas = document.getElementById("code").value.split("\n").length + 1;
        mostradorLinhas = document.getElementById("linhas");
        mostradorLinhas.innerHTML = "";
        for (x = 1; x < linhas; x++) {
            mostradorLinhas.innerHTML += "<span>" + x + "</span>";
        }
    });
    $("#linhas").scroll(function () {
        $("#code").scrollTop($("#linhas").scrollTop());
        $("#code").scrollLeft($("#linhas").scrollLeft());
    });
    $("#code").scroll(function () {
        $("#linhas").scrollTop($("#code").scrollTop());
        $("#linhas").scrollLeft($("#code").scrollLeft());
    });
});
