
            //área de declaração de constantes e váriaveis essenciais
            const ema = document.getElementById('esc_mai');
            const eme = document.getElementById('esc_men');
            const tra = document.getElementById('tra');
            const not = document.getElementById('no');
            const cma = document.getElementById('conv_mai');
            const cme = document.getElementById('conv_men');
            const acd = document.getElementById('aci');
            const cop = document.getElementById('comp');
            const desc = document.getElementById('descrição-janela');
            const titu = document.getElementById('titulo-janela');
            const cont = document.getElementById('contagem');
            const entr = document.getElementById('entrada');
            const envi = document.getElementById('enviar');
            const nova = document.getElementById('novamente')
            var decisão = 0;
            tempo = 0;
            
            //função que abre a janela modal
            function abrir(funcao) {
                var c = 4;
                cont.innerHTML = "";
                cont.classList.add('suma')
                const janela = document.getElementById('janela');
                janela.classList.add('abrirl');
                const conte = setInterval(()=>{
                    c--;
                    if(c < 1) {
                        entr.value = "";
                        cont.classList.remove('suma');
                        titu.classList.remove('suma')
                        desc.classList.remove('suma')
                        entr.classList.add('suma')
                        envi.classList.add('suma')
                        nova.classList.remove('suma')
                        switch (funcao){
                            case 1 : Escala_Maior(1); break
                            case 2 : Escala_Maior(2); break
                            case 3 : Traste(); break
                            case 4 : Nota(); break
                            case 5 : Convertion(1); break
                            case 6 : Convertion(2); break
                        }

                        //faz a contagem e muda a cor do número de acordo q o tempo passa
                        clearInterval(conte); }
                    switch(c){
                        case 3: cont.style.color = "green"; break
                        case 2: cont.style.color = "yellow"; break
                        case 1: cont.style.color = "orange"; break
                        case 0: cont.style.color = "red"; break
                    }
                    cont.innerHTML = c; }, 1000)

                janela.addEventListener('click', (e) => {
                    if (e.target.id == "fechar-janela") {
                        janela.classList.remove('abrirl')
                        titu.classList.add('suma')
                        desc.classList.add('suma')
                        entr.classList.remove('suma')
                        envi.classList.remove('suma')
                        nova.classList.remove('suma')
                    }})}


            function Escala_Maior(menor){
                titu.innerHTML = `Escala ${menor == 2? "menor":"maior"}`;
                /* Para gerar um número aleatório inteiro,
                é preciso, usar a propriedade "Math.floor" para arredondar
                o valor quebrado, usar o "Math.random" que gerara um valor
                aleatório entre 0 e 1 (esses valores saem mega quebrados), 
                e multiplicar entre parentes o maior valor que vc quer que 
                seja no número aleatório + 1, em seguida, menos o menor número
                ao fechar o parenteses, some com o menor valor/número */
                grau = Math.floor(Math.random() * (8 - 2) + 2);
                escala = Math.floor(Math.random() * (12 - 1) + 1);
                convertido = conversão(escala);
                if (tempo > 0) tempo = 0;
                start_time = setInterval(() => {tempo++}, 1000);
                desc.innerHTML = `Na escala ${menor == 2? "menor":"maior"} de ${convertido}, qual é a nota do ${grau}° grau?`;
                if (menor == 2) decisão = 2;
                else decisão = 1;
            }
            function Traste(){
                titu.innerHTML = "Trastes";
                casa = Math.floor(Math.random() * (22 - 0) + 0)
                cordas = Math.floor(Math.random() * (7 - 1) + 1)
                if (tempo > 0) tempo = 0;
                start_time = setInterval(() => {tempo++}, 1000)
                desc.innerHTML = `A partir da ${cordas}° corda. Qual é a nota da ${casa}° casa?`;
                decisão = 3;
            }
            function Nota(){
                titu.innerHTML = "Notas";
                nota_qual = Math.floor(Math.random() * (12 - 1) + 1)
                tons_subir = Math.floor(Math.random() * (17 - 1) + 1)
                backup = nota_qual;
                nota_qual = conversão(nota_qual);
                if (tempo > 0) tempo = 0;
                start_time = setInterval(() => {tempo++}, 1000)
                desc.innerHTML = `A partir da nota ${nota_qual}. Suba <sup>${tons_subir}/2</sup> semitons. Qual nota será?`;
                decisão = 4; }

            function Convertion(manor){
                titu.innerHTML = `Conversão ${manor == 1? "maior":"menor"}`;
                if(manor == 1) se = "Ma";
                else se = "Me";
                tom_ini = Math.floor(Math.random() * (12 - 1) + 1);
                tom_fin = Math.floor(Math.random() * (12 - 1) + 1);
                val_con_ini = conversão(tom_ini);
                val_con_fin = conversão(tom_fin);
                grau_ini = Math.floor(Math.random() * (7 - 1) + 1);
                grau_con_ini = conversão(verificar(tom_ini, grau_ini, se));
                if (tempo > 0) tempo = 0;
                start_time = setInterval(() => {tempo++}, 1000);
                desc.innerHTML = `Converta a nota ${grau_con_ini} do tom de ${val_con_ini} para o tom de ${val_con_fin}`;
                if(manor == 1) decisão = 5; else decisão = 6; }
                

            envi.addEventListener('click', ()=>{
                    clearInterval(start_time);
                    var tempin = tempo;
                    resposta = entr.value;
                    var auxiliar = converter_bemol(resposta);
                    var n3 = 0;
                    entr.classList.remove('suma');
                    envi.classList.remove('suma');
                    switch(decisão){
                        case 1:
                        resultado = verificar(escala, grau, "Ma"); // fazer a conta
                        resultado = conversão(resultado); // transformar em texto
                        break;
                        case 2:
                        resultado = verificar(escala, grau, "Me"); // fazer a conta
                        resultado = conversão(resultado); // transformar em texto
                        break;
                        case 3:
                        resultado = corda(cordas, casa);
                        break;
                        case 4:
                        resultado = conversão(tons_subir+backup);
                        break;
                        case 5: 
                        resultado = verificar(tom_fin, grau_ini, "Ma");
                        resultado = conversão(resultado);
                        break;
                        case 6: 
                        resultado = verificar(tom_fin, grau_ini, "Me")
                        resultado = conversão(resultado);
                        break;
                    }
                    responder(resposta, resultado, tempin, auxiliar);
                })
            function responder(resp, resu, temp, auxi){
                titu.innerHTML = `${auxi == resu?"Parabéns":"Tente uma outra vez" } músico!`;
                desc.innerHTML = `Sua resposta está: ${auxi == resu?"correta":"errada"}<br> seu tempo de resposta: ${temp} segundos<br>
                Sua resposta: ${resp} <br> Resposta certa: ${resu}`;
                nova.classList.add('suma');
            }
            nova.addEventListener('click', ()=>{
                entr.classList.add('suma');
                envi.classList.add('suma');
                nova.classList.remove('suma');
                clearInterval(start_time)
                switch(decisão){
                    case 1: Escala_Maior(1); break;
                    case 2: Escala_Maior(2); break;
                    case 3: Traste(); break;
                    case 4: Nota(); break;
                    case 5 : Convertion(1); break;
                    case 6 : Convertion(2); break;
                }
            })
            function verificar(v1, v2, v3) {
                var soma = 0;
                    switch(v1){
                        case 1: soma += 1; break; //"C"
                        case 2: soma += 2; break; //"C#"
                        case 3: soma += 3; break; //"D"
                        case 4: soma += 4; break; //"D#"
                        case 5: soma += 5; break; //"E"
                        case 6: soma += 6; break; //"F"
                        case 7: soma += 7; break; //"F#"
                        case 8: soma += 8; break; //"G"
                        case 9: soma += 9; break; //"G#"
                        case 10: soma += 10; break; //"A"
                        case 11: soma += 11; break; //"A#"
                        case 12: soma += 12; break; //"B"
                    }
                    //maior
                    if(v3 == "Ma"){
                    for (var n1 = 2; n1 <= 7; n1++) {if (n1 <= v2 & n1 != 4) soma += 2;}
                    if (v2 >= 4) soma += 1;
                    }
                    //menor
                    else if (v3 == "Me"){
                    for (var n2 = 2; n2 <= 7; n2++){if (n2 <= v2 & n2 != 3 & n2 != 6) soma += 2;}
                        if (v2 >= 3) soma += 1;
                        if (v2 >= 6) soma += 1;
                    }
                    return soma;
                }
            
                function conversão(c1)
                {
                    var nota = "";
                    if (c1 == 1 || c1 == 13 || c1 == 25 ) nota = "C"; //"C"
                    else if (c1 == 2 || c1 == 14 || c1 == 26)  nota = "C#"; //"C#" 
                    else if (c1 == 3 || c1 == 15 || c1 == 27)  nota = "D"; //"D"
                    else if (c1 == 4 || c1 == 16 || c1 == 28)  nota = "D#"; //"D#"
                    else if (c1 == 5 || c1 == 17 || c1 == 29)  nota = "E"; //"E"
                    else if (c1 == 6 || c1 == 18 || c1 == 30)  nota = "F"; //"F"
                    else if (c1 == 7 || c1 == 19 || c1 == 31)  nota = "F#"; //"F#"
                    else if (c1 == 8 || c1 == 20 || c1 == 32)  nota = "G"; //"G"
                    else if (c1 == 9 || c1 == 21 || c1 == 33)  nota = "G#"; //"G#"
                    else if (c1 == 10 || c1 == 22 || c1 == 34) nota = "A"; //"A"
                    else if (c1 == 11 || c1 == 23 || c1 == 35) nota = "A#"; //"A#"
                    else if (c1 == 12 || c1 == 24 || c1 == 36) nota = "B"; //"B"
                    return nota;
                }
                function corda(s1=1, s2=0){
                    var notaCasa = "";
                    var valor = s2;
                    switch (s1){
                        case 1: valor += 5; notaCasa = conversão(valor); break
                        case 2: valor += 12; notaCasa = conversão(valor); break
                        case 3: valor += 8; notaCasa = conversão(valor); break
                        case 4: valor += 3; notaCasa = conversão(valor); break
                        case 5: valor += 10; notaCasa = conversão(valor); break
                        case 6: valor += 3; notaCasa = conversão(valor); break
                    }
                    return notaCasa
                }
                function conversão_inversa(m1)
                {
                    var n4 = 0;
                    switch(m1){
                        case "C" : n4 = 1; break;
                        case "D" : n4 = 2; break;
                        case "E" : n4 = 3; break;
                        case "F" : n4 = 4; break;
                        case "G" : n4 = 5; break;
                        case "A" : n4 = 6; break;
                        case "B" : n4 = 7; break;
                    } return n4;
                }
                function conversão_exata(m2)
                {
                    var t1;
                    switch(m2){
                        case 0: t1 = "B"; break;
                        case 1: t1 = "C"; break;
                        case 2: t1 = "D"; break;
                        case 3: t1 = "E"; break;
                        case 4: t1 = "F"; break;
                        case 5: t1 = "G"; break;
                        case 6: t1 = "A"; break;
                        case 7: t1 = "B"; break;
                    } return t1;
                }
                function converter_bemol(p1)
                {
                    var backup1;
                    var n5;
                    if (p1.indexOf("#") > -1) return p1;
                    else if (p1.indexOf("b") > -1){
                        backup1 = p1.replace('b','');
                        n5 = conversão_inversa(backup1);
                        n5--;
                        backup1 = conversão_exata(n5);
                        return (backup1+"#")
                    } else return p1;
                }