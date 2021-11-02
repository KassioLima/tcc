$(document).ready(function(){
    console.log('[EXEMPLO] Flappy Bird');

    const comandos = new Map();

    comandos.set('left', 'left');
    comandos.set('right', 'right');
    comandos.set('step', new RegExp('step [- +]?[0-9]+', 'g'));

    let comands = {validComands: [], invalidComands: []};
    let running = false;

    const sprites = new Image();
    sprites.src = 'sprites.png';

    const canvas = document.querySelector('#game-canvas');
    const contexto = canvas.getContext('2d');
    let flappyBirdDirection = 0;

    canvas.height = screen.availHeight;

    const cenario = new Image();
    cenario.src = 'cenarioJogo.png';

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

    // [Plano de Fundo]
    const planoDeFundo = {
        spriteX: 390,
        spriteY: 0,
        largura: 275,
        altura: 204,
        x: 0,
        y: canvas.height - 204,
        desenha() {
            contexto.fillStyle = '#70c5ce';
            contexto.fillRect(0,0, canvas.width, canvas.height)

            contexto.drawImage(
                sprites,
                planoDeFundo.spriteX, planoDeFundo.spriteY,
                planoDeFundo.largura, planoDeFundo.altura,
                planoDeFundo.x, planoDeFundo.y,
                planoDeFundo.largura, planoDeFundo.altura,
            );

            contexto.drawImage(
                sprites,
                planoDeFundo.spriteX, planoDeFundo.spriteY,
                planoDeFundo.largura, planoDeFundo.altura,
                (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
                planoDeFundo.largura, planoDeFundo.altura,
            );

            contexto.drawImage(
                sprites,
                planoDeFundo.spriteX, planoDeFundo.spriteY,
                planoDeFundo.largura, planoDeFundo.altura,
                (planoDeFundo.x + 2 * planoDeFundo.largura), planoDeFundo.y,
                planoDeFundo.largura, planoDeFundo.altura,
            );
        },
    };

    // [Chao]
    let chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            );

            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura,
            );

            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + 2 * chao.largura), chao.y,
                chao.largura, chao.altura,
            );
        },
    };

    let flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 10,
        desenha() {
            executeComands();
            contexto.save();
            contexto.translate(flappyBird.x + (flappyBird.largura / 2), flappyBird.y + (flappyBird.altura / 2));
            contexto.rotate(flappyBirdDirection * Math.PI / 180);
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY, // Sprite X, Sprite Y
                flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
                -flappyBird.largura / 2, -flappyBird.altura / 2,
                flappyBird.largura, flappyBird.altura
            );
            contexto.restore();
        }
    }
    let flappyBirdAux = {};
    Object.assign(flappyBirdAux, flappyBird);

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
                // flappyBird.desenha();
                let step = Number(comand.split(' ')[1]);
                if(step !== 0)
                {
                    //para baixo ou para cima
                    if(flappyBirdDirection === 90 || flappyBirdDirection === 270) {
                        flappyBird.y = flappyBird.y + (step < 0 ? -10 : 10); //cada step são 10px
                    }
                    // para direita ou esquerda
                    else if(flappyBirdDirection === 0 || flappyBirdDirection === 180) {
                        flappyBird.x = flappyBird.x + (step < 0 ? -10 : 10); //cada step são 10px
                    }
                    step = step < 0 ? step + 1 : step - 1;
                    comands.validComands[0] = 'step ' + step;
                    break;
                }
                else
                    comands.validComands.splice(0, 1);
            }
            else {
                if(comand === 'right') {
                    flappyBirdDirection += 90
                    if(flappyBirdDirection >= 360) {
                        flappyBirdDirection -= 360;
                    }
                }
                else if(comand === 'left') {
                    flappyBirdDirection -= 90
                    if(flappyBirdDirection < 0) {
                        flappyBirdDirection += 360;
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

        // planoDeFundo.desenha();
        // chao.desenha();
        // flappyBird.desenha();
        fundo.desenha();

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
