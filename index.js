const puppeteer = require('puppeteer');

void async function () {
  // How many times to close and open the browser in order to purge any
  // JavaScript code inlining and caching artifacts (might not be a thing
  // that's necessary or perhaps this is not enough and the profile might
  // need to be purged, too, but fow now this is what we have)
  const externalRuns = 5;

  // How many times to run the `test` function found in the test page
  const internalRuns = 2000;

  const tests = ['intl', 'moment', 'globe'];
  for (const test of tests) {
    const marks = [];
    for (let run = 0; run < externalRuns; run++) {
      const browser = await puppeteer.launch({ headless: false });
      try {
        const [page] = await browser.pages();
        const url = `file://${__dirname}/test/${test}/index.html`;
        await page.goto(url);
        const mark = await page.evaluate(() => {
          const stamp = performance.now();
          for (let index = 0; index < internalRuns; index++) {
            test();
          }

          return performance.now() - stamp;
        });

        marks.push(mark);
        console.log(`Test ${test}, run ${run + 1}: ${mark} ms SUCCESS`);
      }
      catch (error) {
        console.log(`Test ${test}, run ${run + 1}: FAIL ${error}`);
      }
      finally {
        await browser.close();
      }
    }

    console.log(`Test ${test}, average ${marks.reduce((a, c) => a + c, 0) / marks.length} ms out of ${marks.length} successful runs`);
  }
}()
