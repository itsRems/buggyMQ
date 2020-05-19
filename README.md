The api service runs on port 3500 and has three endpoints:
/ - gets a random number - one event
/crash - does 3 event requests, only 2 are called, the 2nd never answers
/fix - Same as /crash but with some time between the calls

The code has some comments to show where/when it crashes.