/*
	Truncatie
	Version 1.0
	By Alireza Asadi
*/

(function($){
	$.fn.truncatie = function(options){


		var settings = $.extend({

			type: 'line', // line, word, ...
			max: 1, // for type line, number of lines, for word, number of word
			ellipsis: '...'

		}, options);


		var parser = function(value){
			var regex = /\s+/gi;
		    var words = value.trim().replace(regex, ' ').split(' ');
		    var wordCount = words.length;
		    var totalChars = value.length;
		    var charCount = value.trim().length;
		    var charCountNoSpace = value.replace(regex, '').length;

		    return {
		    	words : words,
		    	wordCount : wordCount,
		    	totalChars : totalChars,
		    	charCount : charCount,
		    	charCountNoSpace : charCountNoSpace
		    };
		};

		var _numberOfLine = function(element){
			var height = $(element).height();
		    var line_height = $(element).css('line-height');
		    line_height = parseFloat(line_height);
		    var rows = height / line_height;
		    return Math.round(rows);
		};

		var truncate = function(_this){
			var truncated = false;
			var val = _this.html();

			// Backup originalText
			if(!_this.attr("data-org-none-trunc"))
				_this.attr("data-org-none-trunc", val);
			else{
				val = _this.attr("data-org-none-trunc");
				_this.html(val);
			}


			var parsed = parser(val);
			var numOfLines = _numberOfLine(_this);

			
			for(var i = parsed.wordCount-1; i > 0 ; i--){

				if(numOfLines <= settings.max)
					break;

				truncated = true;
				var newText = parsed.words.slice(0, i).join(' ');
				_this.html(newText);

				numOfLines = _numberOfLine(_this);
			}

			if(truncated)
				_this.append('<span style="position:absolute;">' + settings.ellipsis + '</span>');
		};

		var init = function(_this){
			truncate(_this);
		};

		return this.each(function(){
			init($(this));
		});
	};
}(jQuery));
