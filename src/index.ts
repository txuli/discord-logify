
export type logLevel = {
    color: string;
    prefix: string;

}
export class log {

    private level = new Map<string, logLevel>([])
    Info(msg: string) {
        process.stdout.write(`${date()} \x1b[36m[INFO]\x1b[0m ${msg}\n`);
    }
    Alert(msg:string){
         process.stdout.write(`${date()} \x1b[33m[WARN]\x1b[0m ${msg}\n`);
    }
    Error(msg:string){
         process.stdout.write(`${date()} \x1b[31m[ERROR]\x1b[0m ${msg}\n`);
    }
}
function date() {
    const d = new Date();
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // +1 porque enero = 0
    const year = d.getFullYear();

    const hour = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    const sec = String(d.getSeconds()).padStart(2, '0');

    return `[${day}/${month}/${year} ${hour}:${min}:${sec}]`;
    ;
}
