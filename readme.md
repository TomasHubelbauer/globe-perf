# Globe Performance

Comparing Globe with pure Intl and Moment.

This test only covers using Globe on the web, Node tests are not provided.

## Running

Run this script in Bash or Posh:

`./run`

## Results

See [`results.md`](results.md).

Intl is consistently the fastest, Moment is about 5x slower and Globe
is almost just as fast as Intl as it merely wraps it and caches the Intl
instance after the cache warm run.

## To-Do

### Profile Intl and Globe and determine the bottle-neck in Globe
