import fs from 'fs/promises';
import htmlTorch from '../src/html-torch';

test('Basic usage of html-torch', async () => {
  const html = await fs.readFile('test/basic.html', 'utf-8');
  const { torchedHTML, summaryJSON } = await htmlTorch(html, {});
  const { elements, selectors } = summaryJSON;

  await fs.writeFile('test/basic.torched.html', torchedHTML, 'utf-8');
  await fs.writeFile(
    'test/basic.torched.json',
    JSON.stringify(elements),
    'utf-8'
  );
  await fs.writeFile(
    'test/basic.selectors.json',
    JSON.stringify(selectors),
    'utf-8'
  );
  expect(torchedHTML).toEqual(expect.any(String));
});
