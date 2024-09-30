![html-torch Open Graph Image](https://html-torch.vercel.app/og.png)

# html-torch 🔥

`html-torch` is a library designed to clean up HTML by removing everything but the tags meaningful to Large Language Models (LLMs). It strips away unnecessary scripts, styles, attributes, and more to tidy up HTML content.

## Getting Started

### Installation

```bash
npm install html-torch
```

## Usage Examples

Here's a basic example of how to use `html-torch` to clean up an HTML file:

```typescript
import htmlTorch from 'html-torch';

const html = '<html>....</html>';
const { torchedHTML, summaryJSON } = await htmlTorch(html);
const { elements, selectors } = summaryJSON;

// html (Original) -> 1.4MB
// torchedHTML (Torched) -> 179KB
// elements (Summary JSON) -> 43KB
```

For more options and detailed usage, refer to the [html-torch.ts](src/html-torch.ts) file.

## Node Version Management

Before running this project locally, set up the Node.js version and install the necessary packages using the following commands:

```bash
nvm install
nvm use
npm install
```

### Running Tests

To ensure everything is working correctly, you can run the tests using the following command:

```bash
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
