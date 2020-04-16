# Globe Performance

Comparing Globe with pure Intl and Moment.

This test only covers using Globe on the web, Node tests are not provided.

## Running

The Globe and Moment tests use CRA so that I didn't have to bother setting
up and maintaing a WebPack config.

Build both first and then run the script [`run.sh`](run.sh).

## Results

See [`results.md`](results.md).

## To-Do

### Introduce more complex test scenarios

The current rudimetary test shows almost equal performance across the board,
which makes sense, because it is the most common case: formatting in en-us.

More tests need to be introduced, specifically dealing with ICU, to show the
real differences.
