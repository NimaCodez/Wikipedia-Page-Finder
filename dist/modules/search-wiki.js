"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchWiki = searchWiki;
const axios_1 = __importDefault(require("axios"));
async function searchWiki(query) {
    const url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${encodeURIComponent(query)}&limit=5000`;
    const response = await axios_1.default.get(url);
    const results = response.data;
    const titles = results[1];
    const descriptions = results[2];
    const links = results[3];
    const inlineResults = titles.map((title, index) => ({
        type: 'article',
        id: String(index),
        title: title,
        input_message_content: {
            message_text: `Result you were looking for: [${title}](${links[index]})`,
            parse_mode: 'Markdown',
        },
        description: descriptions[index] || `Learn more about ${title}`,
        url: links[index],
        hide_url: true,
    }));
    return inlineResults;
}
