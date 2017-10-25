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

		var quiz = $('.quiz');
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

		console.log(arrayCondicoes);

		var nPerguntas = 10;
		var nPerguntasPossiveis = arrayCondicoes.length;
		var indexPerguntas = [];

		while(indexPerguntas.length < nPerguntas){
			var randomnumber = Math.floor((Math.random()*nPerguntasPossiveis));
		    if(indexPerguntas.indexOf(randomnumber) > -1) continue;
		    indexPerguntas.push(randomnumber);
		}

		console.log(indexPerguntas);

		var bolinhasContadoras = '';
		for (i = 1; i <= nPerguntas; i++){
			bolinhasContadoras += '<div></div>';
		}

		quiz.find('.contador').append(bolinhasContadoras);
	}

});











