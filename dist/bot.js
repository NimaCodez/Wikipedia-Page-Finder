"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const telegraf_1 = require("telegraf");
const search_wiki_1 = require("./modules/search-wiki");
(0, dotenv_1.configDotenv)({ path: (0, path_1.join)(process.cwd(), '.env') });
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN);
bot.on('message', async (ctx) => {
    await ctx.reply('Searching via message is not supported yet.', {
        reply_parameters: {
            message_id: ctx.message.message_id,
            allow_sending_without_reply: true
        },
    });
});
bot.on('inline_query', async (ctx) => {
    let query = ctx.inlineQuery.query;
    if (!query)
        return;
    const results = await (0, search_wiki_1.searchWiki)(query);
    await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, results);
});
bot.catch((err, ctx) => {
    console.log(err);
});
bot.launch(() => {
    console.log('Running');
});
