#! /usr/bin/env bun
import { configDotenv } from 'dotenv';
import { join } from 'path';
import { Telegraf } from 'telegraf';
import { searchWiki } from './modules/search-wiki';
configDotenv({ path: join(process.cwd(), '.env') });

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on('message', async ctx => {
    // TODO: handle searching via message
});

bot.on('inline_query', async ctx => {
	let query = ctx.inlineQuery.query;
	if (!query) return;
	const results = await searchWiki(query);
	await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, results);
});

bot.catch((err, ctx) => {
	console.log(err);
});

bot.launch(() => {
	console.log('Running');
});
