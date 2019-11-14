const Router = require('koa-router');
let router = new Router();
const moment = require('moment');
const Telegraf = require('telegraf');
const _ = require('lodash');
const botToken = '974613833:AAH2SfV0uvQwVSimsff6F4Ar9E-z4Vqu3VM';
const chatId = '-1001200783624';

router.post('/sendMessage', async function (ctx) {
    let body = _.clone(ctx.request.body);
    const bot = new Telegraf(botToken);
    try {
        body.phoneRaw = body.phone?body.phone.replace(/\s+|\+|\(|\)/g, ''):'';
        let dt = moment().utc().utcOffset(5);
        bot.telegram.sendMessage(chatId, `${dt.format('HH:mm DD.MM.YYYY')}
<b>${body.fio||''}</b>
<a href="tel:${body.phoneRaw}">${body.phone||''}</a>
${body.city||''}
${body.railway_station?`${body.railway_station}\n`:''}${body.count?`${body.count} т.`:''}
${body.comment||''}`, {parse_mode: 'HTML'});
        ctx.status = 200;
    } catch(err) {
        ctx.status = 500;
    }

});

module.exports = router.routes();