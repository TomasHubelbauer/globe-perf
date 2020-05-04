# Globe Performance

Comparing Globe with pure Intl and Moment.

This test only covers using Globe on the web, Node tests are not provided.

## Running

`./run.sh`

## Results

See [`results.md`](results.md).

## To-Do

### Introduce more complex test scenarios

The current rudimetary test shows almost equal performance across the board,
which makes sense, because it is the most common case: formatting in en-us.

More tests need to be introduced, specifically dealing with ICU, to show the
real differences.
