const puppeteer = require('puppeteer');
const fs = require('fs');

void async function () {
  // How many times to close and open the browser in order to purge any
  // JavaScript code inlining and caching artifacts (might not be a thing
  // that's necessary or perhaps this is not enough and the profile might
  // need to be purged, too, but fow now this is what we have)
  const externalRuns = 2;

  // How many times to run the `window.test` function found in the test page
  const internalRuns = 10000;

  const results = [];

  const locales = [
    { name: 'en', expected: { globe: '4/16/2020', intl: '4/16/2020', moment: '04/16/2020' } },
    { name: 'cs', expected: { globe: '16. 4. 2020', intl: '16. 4. 2020', moment: '16.04.2020' } },
  ];
  for (const locale of locales) {
    const tests = ['globe', 'intl', 'moment'];
    for (const test of tests) {
      const marks = [];
      for (let run = 0; run < externalRuns; run++) {
        const browser = await puppeteer.launch({ headless: false });
        try {
          const [page] = await browser.pages();
          const url = `file://${__dirname}/test/${test}-${locale.name}/build/index.html`;
          await page.goto(url);
          const mark = await page.evaluate((internalRuns, date, expected) => {
            const stamp = performance.now();
            for (let index = 0; index < internalRuns; index++) {
              const actual = window.test(date);
              if (actual !== expected) {
                throw new Error(`'${actual}' does not match '${expected}'.`);
              }
            }

            return performance.now() - stamp;
          }, internalRuns, new Date(2020, 3, 16, 10, 0, 0), locale.expected[test]);

          marks.push(mark);
          console.log(`Test ${test} ${locale.name}, run ${run + 1}: ${mark} ms SUCCESS`);
        }
        catch (error) {
          console.log(`Test ${test} ${locale.name}, run ${run + 1}: FAIL ${error}`);
          break;
        }
        finally {
          await browser.close();
        }
      }

      const average = marks.reduce((a, c) => a + c, 0) / marks.length;
      console.log(`Test ${test} ${locale.name}, average ${average} ms out of ${marks.length} successful runs`);
      results.push({ test, locale: locale.name, average });
    }
  }

  const content = ['# Results', '', `External runs: ${externalRuns}`, '', `Internal runs: ${internalRuns}`, ''];
  for (const result of results) {
    content.push(`- ${result.test} ${result.locale}: ${result.average} ms`);
  }

  fs.writeFileSync('results.md', content.join('\n') + '\n');
}()
