const vscode = require('vscode');
const { Configuration, OpenAIApi } = require('openai');
const { encode } = require('gpt-3-encoder');

const config = vscode.workspace.getConfiguration('codedoc');

const configuration = new Configuration({
	apiKey: config.get('api_key'),
});

const openai = new OpenAIApi(configuration);
const clamp = (num, min, max) => Math.min(Math.max(num, min), max); // From some stack overflow article from a while ago

const MAX_TOKENS = 2048;

function getOpenAIChoice(response) {
	const choices = response.data.choices;
	
	if (choices && choices.length > 0) 
		return choices[0].text.replace('AI:', '').replace('Human:').trim();
}

async function generateDocumentationHeader(code) {
	const maxTokens = config.get('max_tokens');

    return await openai.createCompletion('text-davinci-002', {
		prompt: `Create a jsdoc header for the following code:\n${code}`,
		temperature: 0.7,
		max_tokens: clamp(MAX_TOKENS - encode(code).length, 1, maxTokens),
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0
	});
}

async function generateDocumentation(code) {
	return await openai.createEdit('code-davinci-edit-001', {
		input: code,
		instruction: 'Document any complicated lines of this code',
		temperature: 0,
		top_p: 1
	});
}

module.exports = { generateDocumentationHeader, generateDocumentation, getOpenAIChoice };