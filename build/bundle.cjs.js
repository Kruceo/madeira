'use strict';

var fs = require('fs');
var coloraljs = require('coloraljs');
var path = require('path');

class Logger {
    constructor(local) {
        this.time = () => {
            const date = (new Date());
            const time = date.toISOString().replace('T',' ').replace('Z','');
            return time
        };
        this.local = local;

        if(!fs.existsSync(this.local))fs.mkdirSync(this.local,{recursive:true});
        this.error = (text) => {
            console.log(coloraljs.coloral.markred('[ERR]') + ' ' + this.time() + ' # ' + text);
            if(this.local)fs.appendFileSync(path.resolve(this.local,this.time().split(' ')[0] + '.txt'),'[ERR] '+this.time() + ' # ' + text+'\n');
        };
        this.info = (text) => {
            console.log(coloraljs.coloral.markblue('[INF]') + ' ' + this.time() + ' # ' + text);
            if(this.local)fs.appendFileSync(path.resolve(this.local,this.time().split(' ')[0] + '.txt'),'[INF] '+this.time() + ' # ' + text+'\n');
        };
        this.warn = (text) => {
            console.log(coloraljs.coloral.markyellow('[WRN]') + ' ' + this.time() + ' # ' + text);
            if(this.local)fs.appendFileSync(path.resolve(this.local,this.time().split(' ')[0] + '.txt'),'[WRN] '+this.time() + ' # ' + text+'\n');
        };
        this.done = (text) => {
            console.log(coloraljs.coloral.markgreen('[DON]') + ' ' + this.time() + ' # ' + text);
            if(this.local)fs.appendFileSync(path.resolve(this.local,this.time().split(' ')[0] + '.txt'),'[DON] '+this.time() + ' # ' + text+'\n');
        };
    }
}

const logger = new Logger('./logs');

logger.error('rafa');
logger.warn('logger terminated');
logger.info('somebody');
logger.done('ultra book');
