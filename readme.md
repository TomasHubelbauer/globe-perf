# Globe Performance

Comparing Globe with pure Intl and Moment.

This test only covers using Globe on the web, Node tests are not provided.

## Running

`./run.sh`

## Results

See [`results.md`](results.md).

Intl is consistently the fastest, Moment is about 5x slower and Globe
is very slow, about 40x slower than Intl.

## To-Do

### Profile Intl and Globe and determine the bottle-neck in Globe
