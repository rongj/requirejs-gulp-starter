(function(tagger) {
  if (typeof define === 'function' && define.amd) {
    define(['riot'], function(riot) { tagger(riot); });
  } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    tagger(require('riot'));
  } else {
    tagger(window.riot);
  }
})(function(riot) {
riot.tag('list', ' <ul> <li each="{ item, i in items }">{ item }</li> </ul> <form onsubmit="{ add }"> <input> <button>添加列表元素--{ items.length + 1 }</button> </form>  ', 'list li, [riot-tag="list"] li{ list-style: disc; }', function(opts) {
    this.items = ['默认值01', '默认值02']

    this.add = function(e) {
        var input = e.target[0],
        	v = input.value.trim();

    	if(!v) {
	    	$.toast('不能为空')
    	} else {
	        this.items.push(v)
        	input.value = ''
    	}
    }.bind(this);
    
});
riot.mount('list')

});