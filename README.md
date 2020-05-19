The api service runs on port 3500 and has two endpoints: / (gets a random number - one event) and /crash (does 3 event requests, only 2 are called, the 2nd never answers)

The code has some comments to show where/when it crashes.