import { InlineQueryResult } from '@telegraf/types';
import axios from 'axios';

export async function searchWiki(query: string): Promise<InlineQueryResult[]> {
	const searchUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${encodeURIComponent(
		query,
	)}&limit=5000`;

	const response = await axios.get(searchUrl);
	const [, titles, descriptions, links] = response.data;

	const inlineResults = await Promise.all(
		titles
			.slice(0, 50)
			.map(async (title: string, index: number): Promise<InlineQueryResult> => {
				const pageUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
					title,
				)}&prop=pageimages&format=json&pithumbsize=500`;
				const pageResponse = await axios.get(pageUrl);
				const pages = pageResponse.data.query.pages;
				const pageId = Object.keys(pages)[0];
				const imageUrl = pages[pageId].thumbnail
					? pages[pageId].thumbnail.source
					: '';

				return {
					type: 'article',
					id: String(index),
					title: title,
					input_message_content: {
						message_text: `Result you were looking for: [${title}](${links[index]})`,
						parse_mode: 'Markdown',
					},
					description: descriptions[index] || `Learn more about ${title}`,
					thumbnail_url: imageUrl,
					url: links[index],
					hide_url: true,
				};
			}),
	);

	return inlineResults;
}
