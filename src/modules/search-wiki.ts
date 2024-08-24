import { InlineQueryResult } from '@telegraf/types';
import axios from 'axios';

export async function searchWiki(query: string): Promise<InlineQueryResult[]> {
	const url = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${encodeURIComponent(
		query,
	)}&limit=5000`;

	const response = await axios.get(url);
	const results = response.data;

	const titles: string[] = results[1];
	const descriptions: string[] = results[2];
	const links: string[] = results[3];

	const inlineResults = titles.slice(0, 50).map(
		(title: string, index: number): InlineQueryResult => ({
			type: 'article',
			id: String(index),
			title: title,
			input_message_content: {
				message_text: `Result you were looking for: [${title}](${links[index]})`,
				parse_mode: 'Markdown',
			},
			description: descriptions[index] || `Learn more about ${title}`,
			url: links[index],
		}),
	);
	return inlineResults;
}
