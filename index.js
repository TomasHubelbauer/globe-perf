const puppeteer = require('puppeteer');
const fs = require('fs');

void async function () {
  // How many times to close and open the browser in order to purge any
  // JavaScript code inlining and caching artifacts (might not be a thing
  // that's necessary or perhaps this is not enough and the profile might
  // need to be purged, too, but fow now this is what we have)
  const externalRuns = 5;

  // How many times to run the `test` function found in the test page
  const internalRuns = 10000;

  const results = [];

  const tests = ['globe', 'intl', 'moment'];
  for (const test of tests) {
    const marks = [];
    for (let run = 0; run < externalRuns; run++) {
      const browser = await puppeteer.launch({ headless: false });
      try {
        const [page] = await browser.pages();
        const url = `file://${__dirname}/test/${test}/build/index.html`;
        await page.goto(url);
        const mark = await page.evaluate((internalRuns, date, expected) => {
          const stamp = performance.now();
          for (let index = 0; index < internalRuns; index++) {
            const actual = test(date);
            if (actual !== expected) {
              throw new Error(`'${actual}' does not match '${expected}'.`);
            }
          }

          return performance.now() - stamp;
        }, internalRuns, new Date(2020, 3, 16, 15, 0, 0), '4/16/2020');

        marks.push(mark);
        console.log(`Test ${test}, run ${run + 1}: ${mark} ms SUCCESS`);
      }
      catch (error) {
        console.log(`Test ${test}, run ${run + 1}: FAIL ${error}`);
        break;
      }
      finally {
        await browser.close();
      }
    }

    const average = marks.reduce((a, c) => a + c, 0) / marks.length;
    console.log(`Test ${test}, average ${average} ms out of ${marks.length} successful runs`);
    results.push({ test, average });
  }

  fs.writeFileSync('results.md', `# Results\n\n${results.map(result => `- ${result.test}: ${result.average} ms`).join('\n')}\n`);
}()
