const template = (target, tpl) => {
    let getProp = (target, arr) => arr.length === 0 ? target : getProp(target[arr.shift()], arr);
    return tpl.replace(/\{[A-Za-z0-9.]+\}/g, match => getProp(target, match.slice(1, -1).split('.')));
};

let req = {ip: '127.0.0.1', b: {c: 2, a: 3}};
let tpl = 'xxxx:{ip}:{b.c}:{b.a}';

console.log(template(req, tpl));
