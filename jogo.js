$(document).ready(function(){
    console.log('[DevSoutinho] Flappy Bird');

    const sprites = new Image();
    sprites.src = 'sprites.png';

    const canvas = document.querySelector('#game-canvas');
    const contexto = canvas.getContext('2d');

    canvas.height = screen.availHeight;

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
        },
    };

    // [Chao]
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        desenha() {
            console.log(canvas.height + " - 112");
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

    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 100,
        y: 10,
        desenha() {
            contexto.drawImage(
                sprites,
                flappyBird.spriteX, flappyBird.spriteY, // Sprite X, Sprite Y
                flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
                flappyBird.x, flappyBird.y,
                flappyBird.largura, flappyBird.altura,
            );
        }
    }

    function loop(repetir = true) {
        planoDeFundo.desenha();
        chao.desenha();
        flappyBird.desenha();

        flappyBird.y = flappyBird.y + 1;
        if(repetir)
            requestAnimationFrame(loop);
    }
    loop(false);
    $("#play").click(function(){
        loop();
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