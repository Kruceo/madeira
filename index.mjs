import fs from 'fs'
import { coloral } from 'coloraljs'
import path from 'path'

export class Logger {
    /**
     * Create a logger object to print and save log files.
     * @param {string} local - The folder to save log files.
     * @param {{
     * format:string
     * }} options - extra options.
     */
    constructor(local,options) {
        this.time = () => {
            const date = (new Date())
            const time = date.toISOString().replace('Z','')
            return time.split('T')
        }
        this.local = local
        this.format = options?options.format??'txt':'txt'

        if(!fs.existsSync(this.local))fs.mkdirSync(this.local,{recursive:true})
        this.error = (text) => {
            console.log(coloral.markred('[ERR]') + ' ' + this.time()[1] + ' # ' + text)
            if(this.local)fs.appendFileSync(path.resolve(this.local,this.time()[0] + '.' + this.format),'[ERR] '+this.time() + ' # ' + text+'\n')
        }
        this.info = (text) => {
            console.log(coloral.markblue('[INF]') + ' ' + this.time()[1] + ' # ' + text)
            if(this.local)fs.appendFileSync(path.resolve(this.local,this.time()[0] + '.' + this.format),'[INF] '+this.time() + ' # ' + text+'\n')
        }
        this.warn = (text) => {
            console.log(coloral.markyellow('[WRN]') + ' ' + this.time()[1] + ' # ' + text)
            if(this.local)fs.appendFileSync(path.resolve(this.local,this.time()[0] + '.' + this.format),'[WRN] '+this.time() + ' # ' + text+'\n')
        }
        this.done = (text) => {
            console.log(coloral.markgreen('[DON]') + ' ' + this.time()[1] + ' # ' + text)
            if(this.local)fs.appendFileSync(path.resolve(this.local,this.time()[0] + '.' + this.format),'[DON] '+this.time() + ' # ' + text+'\n')
        }
    }
}