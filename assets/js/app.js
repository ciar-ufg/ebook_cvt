jQuery(document).ready(function($) {




	/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
	/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=   Menu ao rolar   -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
	/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */
	
	var cabecalho = $('#cabecalho');
	var menu = $('#navpaginas');
	var menufixo = $('#navpaginas-fixo');
	var janela = $(window);
	var menu_top = menu.offset().top;
	var menu_bottom = menu_top+menu.height();
	var scrollAtual = janela.scrollTop();

	janela.on('scroll', function(event) {
		var thisScroll = $(this).scrollTop();
		if (thisScroll > scrollAtual) {
			if (thisScroll > menu_bottom) {
				menufixo.removeClass('dn visivel');
			} else{
				menufixo.addClass('dn');
			}
		} else if (thisScroll < scrollAtual){
			if (thisScroll > menu_top) {
				menufixo.addClass('visivel').removeClass('dn');
			} else{
				menufixo.removeClass('visivel').addClass('dn');
			}
		}
		scrollAtual = thisScroll;
	});





	/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
	/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=   Timeline   -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
	/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

	var timeline = $('.timeline');

	if (timeline.length > 0) {

		var containerTextos = timeline.find('.textos');
		var scrollerTextos = containerTextos.find('.scroller');
		var tablesTextos = scrollerTextos.find('table.item');
		var containerBotoes = timeline.find('.tempos');
		var scrollerBotoes = containerBotoes.find('.scroller');
		var timelineBotoes = scrollerBotoes.find('button');

		var tempoAtual = 0;

		var crossBrowserTransform = function(valor){
			return {
				'-webkit-transform': valor,
				    '-ms-transform': valor,
				        'transform': valor
			};
		}
		
		var atualizarTempo = function(){
			var botaoAtual = timelineBotoes.eq(tempoAtual);
			timelineBotoes.removeClass('ativo traco-ativo');
			botaoAtual.addClass('ativo');
			var posScrollerBt = scrollerBotoes.width()/2 - botaoAtual.position().left - botaoAtual.outerWidth()/2 ;
			scrollerBotoes.css(crossBrowserTransform('translateX('+posScrollerBt+'px)'));

			for(i = 0; i < tempoAtual; i++){
				timelineBotoes.eq(i).addClass('traco-ativo');
			}

			var textoAtual = tablesTextos.eq(tempoAtual);
			tablesTextos.removeClass('ativo');
			textoAtual.addClass('ativo');
			var posScrollerTexto = scrollerTextos.width()/2 - textoAtual.position().left - textoAtual.outerWidth()/2 ;
			scrollerTextos.css(crossBrowserTransform('translateX('+posScrollerTexto+'px)'));
		}

		timelineBotoes.on('click', function(event) {
			tempoAtual = timelineBotoes.index($(this));
			atualizarTempo();
		});

		atualizarTempo();
	}





	/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
	/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=   Quiz   -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
	/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

	if ($('.quiz').length > 0) {

		// 1: Usar a tabela de respostas como fonte de informação pro quiz.
		var tableRespostas = $('.resposta-quiz');
		var arrayCondicoes = [];

		tableRespostas.find('tbody > tr').each(function(index, el) {
			var categoria = $(el).find('td').eq(0).text();
			$(el).find('td').eq(1).children('p').each(function(index2, el2) {
				arrayCondicoes.push(
					{
						'condicao': $(el2).text(),
						'categoria': categoria,
						'nCat': index
					}
				)
			});
		});


		// 2: Definir quantas perguntas terão, e escolher as perguntas aleatórias. (No caso, o index delas, as perguntas em si serão resgatadas depois)
		var nPerguntas = 10;
		var nPerguntasPossiveis = arrayCondicoes.length;
		var indexPerguntas = [];

		while(indexPerguntas.length < nPerguntas){
			var randomnumber = Math.floor((Math.random()*nPerguntasPossiveis));
		    if(indexPerguntas.indexOf(randomnumber) > -1) continue;
		    indexPerguntas.push(randomnumber);
		}


		var quiz = $('.quiz');


		// // 3: adicionar o contador  de perguntas. 


		// @@@@@@@@@@@@@@@@@@@@@@    Abandonado por enquanto     @@@@@@@@@@@@@@@@@@@@@@

		// var bolinhasContadoras = '';
		// for (i = 1; i <= nPerguntas; i++){
		// 	bolinhasContadoras += '<div></div>';
		// }
		// quiz.find('.contador').append(bolinhasContadoras);

		// var bolinhas = quiz.find('.contador > div');

		// @@@@@@@@@@@@@@@@@@@@@@    Abandonado por enquanto     @@@@@@@@@@@@@@@@@@@@@@


		var progressBar = quiz.find('.barra-progresso');

		var botoesQuiz = quiz.find('.alternativas > button');
		var perguntaAtual = 0;
		var indexBotaoCorreto = 0;
		var qntsAcertou = 0;

		// 4: variavel com todos os eventos animationend
		var animationend_crossbrowser = 'animationend webkitAnimationEnd oanimationend MSAnimationEnd';

		// 5: Função que define a próxima pergunta
		var proxPergunta = function(){
			var textosPerguntaAtual = arrayCondicoes[indexPerguntas[perguntaAtual]];
			var textoCondicao = quiz.find('p.texto-condicao');
			if (perguntaAtual < nPerguntas) {
				textoCondicao.removeClass('volta some').addClass('some').on(animationend_crossbrowser, function(event) {
					indexBotaoCorreto = parseInt(textosPerguntaAtual['nCat']);

					// @@@@@@@@@@@@@@@@@@@@@@    Abandonado por enquanto     @@@@@@@@@@@@@@@@@@@@@@
					// bolinhas.eq(perguntaAtual).addClass('atual'); 

					progressBar.css('width', ( Math.floor( ( (perguntaAtual) /nPerguntas)*100 ) )+'%');
					podeResponder = true;
					botoesQuiz.removeAttr('disabled');
					textoCondicao
					.off(animationend_crossbrowser)
					.text(textosPerguntaAtual['condicao'])
					.removeClass('some')
					.addClass('volta');
				});
			} else{
				var txtTerminou = quiz.find('.terminou');
				txtTerminou.find('.span-total').text(nPerguntas).end().find('.span-acertos').text(qntsAcertou);
				progressBar.css('width', '100%');
				txtTerminou.removeClass('dn').animate({'opacity': '1'}, 600, function(){
					txtTerminou.addClass('mostrafilhos');
					txtTerminou.children('button').on('click', function(event) {
						tableRespostas.addClass('visivel');
						$('html').animate({'scrollTop': tableRespostas.offset().top}, 1000);
					});
				});
			}
			
		}

		proxPergunta();

		var podeResponder = true;

		botoesQuiz.on('click', function(event) {

			event.preventDefault();

			if (podeResponder === true) {
				podeResponder = false;
				botoesQuiz.attr('disabled', 'disabled');
				var resultado = '';
				if (botoesQuiz.index($(this)) === indexBotaoCorreto) {
					$(this).addClass('acertou');
					resultado = 'acertou';
					qntsAcertou += 1;
				} else{
					$(this).addClass('errou');
					botoesQuiz.eq(indexBotaoCorreto).addClass('mostrarCerto');
					resultado = 'errou';

				}
				var timerProxPerg = setTimeout(
					function(){
						botoesQuiz.removeClass('errou acertou mostrarCerto')

						// @@@@@@@@@@@@@@@@@@@@@@    Abandonado por enquanto     @@@@@@@@@@@@@@@@@@@@@@
						// bolinhas.eq(perguntaAtual).removeClass('atual').addClass(resultado);

						perguntaAtual += 1;
						proxPergunta();
					},
					1500
				);
			}
			
		});
		
	}

});











