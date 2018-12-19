function SourceLoad(num) {
    this._num      = num || 0;
    this._count      = 0;
    this._dispatcher = {};
}

SourceLoad.prototype.loadOne = function(){
    if(this._count<this._num)
    {
        this._count++;
        this._dispathEvent('loading');
    }
    if(this._count==this._num){
        this._dispathEvent('loadDone');
    }
}

SourceLoad.prototype.hasDone=function(){
    return this._num==this._count;
}

SourceLoad.prototype.getLoadPercent = function(){
    return parseInt(this._count/this._num*100);
}

SourceLoad.prototype.on = function(eventType,cbk){
    var cbkList = this._dispatcher[eventType] || [];
    cbkList.push(cbk);
    this._dispatcher[eventType] = cbkList;
}

SourceLoad.prototype._dispathEvent = function(eventType){
    var cbkList = this._dispatcher[eventType] || []
    for (var i = 0; i < cbkList.length; i++) {
        cbkList[i] && cbkList[i]()
    }
}