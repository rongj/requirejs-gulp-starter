<list>
    <!-- layout -->
    <ul>
        <li each={ item, i in items }>{ item }</li>
    </ul>
    <form onsubmit={ add }>
        <input>
        <button>添加列表元素--{ items.length + 1 }</button>
    </form>
    <!-- style -->
    <style scoped>
    li {
        list-style: disc;
    }
    </style>
    <!-- logic -->
    <script>
    this.items = ['默认值01', '默认值02']

    add(e) {
        var input = e.target[0],
        	v = input.value.trim();

    	if(!v) {
	    	$.toast('不能为空')
    	} else {
	        this.items.push(v)
        	input.value = ''
    	}
    }
    </script>
</list>
riot.mount('list')